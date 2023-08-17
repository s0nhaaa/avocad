import { database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { OrbitControls, PerspectiveCamera, Torus } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useWallet } from "@solana/wallet-adapter-react"
import { onValue, ref, remove } from "firebase/database"
import { Suspense, useEffect } from "react"
import { Map } from "./map"
import MainPlayer from "./player/main"
import OtherPlayers from "./player/others"
import { Physics, RigidBody, CuboidCollider } from "@react-three/rapier"
import MainPlayerPhysic from "./player/main-physic"
import { MapPhysic } from "./map-physic"

export default function Scene() {
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
  const { publicKey } = useWallet()

  useEffect(() => {
    onValue(ref(database, "players"), (snapshot) => {
      setPlayers(snapshot.val())
    })

    window.addEventListener("beforeunload", (event) => {
      remove(ref(database, `players/${publicKey?.toString()}`))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-emerald-300 from-10% to-emerald-500 to-90%">
      <Canvas>
        <ambientLight intensity={2} />
        <OrbitControls />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} castShadow />

        <Suspense>
          <Physics debug gravity={[0, -9.82, 0]}>
            <MainPlayerPhysic id={publicKey?.toString()} />
            <MapPhysic position={[0, -1, 0]} />

            {/* <CuboidCollider position={[0, -0.5, 0]} args={[20, 0.5, 20]} /> */}
          </Physics>
        </Suspense>

        {/* <MainPlayer id={publicKey?.toString()} /> */}

        <OtherPlayers players={players} mainPlayerId={publicKey?.toString()} />

        {/* <Map position={[0, -1, 0]} /> */}
      </Canvas>
    </div>
  )
}
