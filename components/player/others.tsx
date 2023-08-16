import { Player, Players } from "@/types/player"
import { Html } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { Group, Quaternion, Vector3 } from "three"
import Avo from "./avo"

type PlayerProps = {
  players: Players | undefined
  mainPlayerId: string | undefined
}

const nextPosition = new Vector3()
const nextQuaternion = new Quaternion()

export default function OtherPlayers(props: PlayerProps) {
  return (
    <>
      {props.players &&
        Object.values(props.players).map((player) => (
          <>{player.address !== props.mainPlayerId && <Other player={player} key={player.address} />}</>
        ))}
    </>
  )
}

function Other({ player }: { player: Player }) {
  const playerRef = useRef<Group>(null)

  useFrame(() => {
    if (playerRef.current) {
      nextPosition.fromArray([player.position.x, player.position.y, player.position.z])
      nextQuaternion.fromArray([player.quaternion.x, player.quaternion.y, player.quaternion.z, player.quaternion.w])
      playerRef.current.position.lerp(nextPosition, 0.5)
      playerRef.current.quaternion.rotateTowards(nextQuaternion, 0.4)
    }
  })

  return (
    <group ref={playerRef}>
      <Avo anim={player.animation} />
      <Html position={[0, 2, 0]} center>
        <div className="px-3 pb-2 pt-1 rounded-lg bg-base-200 select-none">
          <div className="badge badge-accent badge-sm mt-2 font-medium">$GUAC hodler</div>
          <span className="">{player.username}</span>
        </div>
      </Html>
    </group>
  )
}
