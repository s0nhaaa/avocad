import { useControls } from "@/hooks/useControls"
import { database } from "@/services/firebase"
import { AvoActionName } from "@/types/player"
import { useFrame } from "@react-three/fiber"
import { CapsuleCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { ref, update } from "firebase/database"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { Vector3 } from "three"
import Avo from "./avo"
import useMaterial from "@/hooks/useMaterial"
import { remove } from "firebase/database"
import { useKeyPressEvent } from "react-use"

const SPEED = 10
const OFFSET = 5

type MainPlayerProps = {
  id: string | undefined
}

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

export default function MainPlayerPhysic(props: MainPlayerProps) {
  const playerRef = useRef<THREE.Group | null>(null)
  const physicRef = useRef<RapierRigidBody>(null)
  const { up, down, left, right } = useControls()

  const anim = useMemo<AvoActionName>(() => {
    let a = up || down || left || right ? "run" : "idle"

    props.id &&
      update(ref(database, `players/${props.id}`), {
        animation: a,
      })

    return a as AvoActionName
  }, [up, down, left, right, props.id])
  const frames = useRef(0)

  const [position] = useMaterial((s) => [s.position])

  const claimMaterial = () => {
    console.log("claimed")

    remove(ref(database, `materials/${position}`))
  }

  useKeyPressEvent(" ", claimMaterial)

  useFrame(({ camera }) => {
    if (!playerRef.current) return
    if (!physicRef.current) return

    if (up || down || left || right) {
      frames.current += 1

      up && playerRef.current.rotation.set(0, Math.PI, 0)
      down && playerRef.current.rotation.set(0, 0, 0)
      left && playerRef.current.rotation.set(0, -Math.PI / 2 + (up ? -Math.PI / 4 : down ? Math.PI / 4 : 0), 0)
      right && playerRef.current.rotation.set(0, Math.PI / 2 + (up ? Math.PI / 4 : down ? -Math.PI / 4 : 0), 0)

      if (frames.current % OFFSET === 0) {
        update(ref(database, `players/${props.id}`), {
          position: {
            x: playerRef.current.position.x,
            y: playerRef.current.position.y,
            z: playerRef.current.position.z,
          },
          quaternion: {
            x: playerRef.current.quaternion.x,
            y: playerRef.current.quaternion.y,
            z: playerRef.current.quaternion.z,
            w: playerRef.current.quaternion.w,
          },
          animation: "run",
        })

        frames.current = 0
      }
    }

    frontVector.set(0, 0, Number(down) - Number(up))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)
    physicRef.current.setLinvel({ x: direction.x, y: physicRef.current.linvel().y, z: direction.z }, true)

    const translation = physicRef.current.translation()

    playerRef.current.position.set(translation.x, translation.y - 1, translation.z)
    camera.position.z = translation.z + 10
    camera.position.x = translation.x
    camera.lookAt(playerRef.current.position.clone().setY(1))
  })

  return (
    <group>
      <RigidBody
        canSleep={true}
        enabledRotations={[false, false, false]}
        ref={physicRef}
        colliders={false}
        position={[3, 0.5, 3]}
      >
        <CapsuleCollider args={[0.5, 0.5]}></CapsuleCollider>
      </RigidBody>
      <group ref={playerRef}>
        <Avo anim={anim} />
      </group>
    </group>
  )
}
