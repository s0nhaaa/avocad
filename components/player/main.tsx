import { useControls } from "@/hooks/useControls"
import { database } from "@/services/firebase"
import { AvoActionName } from "@/types/player"
import { useFrame } from "@react-three/fiber"
import { ref, update } from "firebase/database"
import { useMemo, useRef } from "react"
import * as THREE from "three"
import Avo from "./avo"
// XPRd0jb
const SPEED = 0.1
const OFFSET = 5

type MainPlayerProps = {
  id: string | undefined
}

export default function MainPlayer(props: MainPlayerProps) {
  const player = useRef<THREE.Group | null>(null)
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

  useFrame(({ camera }) => {
    if (!player.current) return

    if (up || down || left || right) {
      frames.current += 1

      player.current.position.z += SPEED * (Number(down) - Number(up))
      player.current.position.x += SPEED * (Number(right) - Number(left))

      camera.position.z += SPEED * (Number(down) - Number(up))
      camera.position.x += SPEED * (Number(right) - Number(left))

      up && player.current.rotation.set(0, Math.PI, 0)
      down && player.current.rotation.set(0, 0, 0)
      left && player.current.rotation.set(0, -Math.PI / 2 + (up ? -Math.PI / 4 : down ? Math.PI / 4 : 0), 0)
      right && player.current.rotation.set(0, Math.PI / 2 + (up ? Math.PI / 4 : down ? -Math.PI / 4 : 0), 0)

      if (frames.current % OFFSET === 0) {
        update(ref(database, `players/${props.id}`), {
          position: {
            x: player.current.position.x,
            y: player.current.position.y,
            z: player.current.position.z,
          },
          quaternion: {
            x: player.current.quaternion.x,
            y: player.current.quaternion.y,
            z: player.current.quaternion.z,
            w: player.current.quaternion.w,
          },
          animation: "run",
        })

        frames.current = 0
      }
    }

    camera.lookAt(player.current.position.clone().setY(1))
  })

  return (
    <group ref={player}>
      <Avo anim={anim} />
    </group>
  )
}
