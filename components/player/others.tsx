import { AvoActionName, Players } from "@/types/player"
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Quaternion, Vector3 } from "three"
import Avo from "./avo"

type PlayerProps = {
  players: Players | undefined
  mainPlayerId: string
}

const nextPosition = new Vector3()
const nextQuaternion = new Quaternion()

export default function OtherPlayers(props: PlayerProps) {
  return (
    <>
      {props.players &&
        Object.values(props.players).map((player) => (
          <>
            {player.id !== props.mainPlayerId && (
              <Other
                animation={player.animation}
                key={player.id}
                position={player.position}
                quaternion={player.quaternion}
                walletAddress={player.walletAddress}
              />
            )}
          </>
        ))}
    </>
  )
}

type OtherProps = {
  walletAddress: Players["id"]["walletAddress"]
  position: Players["id"]["position"]
  quaternion: Players["id"]["quaternion"]
  animation: AvoActionName
}

function Other(props: OtherProps) {
  const playerRef = useRef<Group>(null)

  useFrame(() => {
    if (playerRef.current) {
      nextPosition.fromArray([props.position.x, props.position.y, props.position.z])
      nextQuaternion.fromArray([props.quaternion.x, props.quaternion.y, props.quaternion.z, props.quaternion.w])
      playerRef.current.position.lerp(nextPosition, 0.5)
      playerRef.current.quaternion.rotateTowards(nextQuaternion, 0.4)
    }
  })

  return (
    <group ref={playerRef}>
      <Avo anim={props.animation} />
      <Html position={[0, 2, 0]} center>
        <span className="px-3 py-2 rounded-lg bg-base-200 select-none">Hey</span>
      </Html>
    </group>
  )
}
