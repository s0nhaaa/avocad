import { database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { Physics } from "@react-three/rapier"
import { useWallet } from "@solana/wallet-adapter-react"
import { onValue, ref, remove } from "firebase/database"
import { Suspense, useEffect, useState } from "react"
import { MapPhysic } from "./map-physic"
import Materials from "./materials"
import MainPlayerPhysic from "./player/main-physic"
import OtherPlayers from "./player/others"
import RecipeManager from "./recipe-manager"

export default function Scene() {
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
  const { publicKey } = useWallet()
  const [materials, setMaterials] = useState()

  useEffect(() => {
    onValue(ref(database, "players"), (snapshot) => {
      setPlayers(snapshot.val())
    })

    onValue(ref(database, "materials"), (snapshot) => {
      setMaterials(snapshot.val())
    })

    window.addEventListener("beforeunload", () => {
      remove(ref(database, `players/${publicKey?.toString()}`))
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-emerald-300 from-10% to-emerald-500 to-90%">
      <Canvas>
        <ambientLight intensity={2} />
        <PerspectiveCamera makeDefault position={[0, 5, 10]} castShadow />
        <Suspense>
          <Physics gravity={[0, -9.82, 0]}>
            <Materials materials={materials} />
            <MainPlayerPhysic id={publicKey?.toString()} />
            <MapPhysic position={[0, -1, 0]} />
          </Physics>
        </Suspense>
        <OtherPlayers players={players} mainPlayerId={publicKey?.toString()} />
      </Canvas>

      <RecipeManager materials={materials} />
    </div>
  )
}
