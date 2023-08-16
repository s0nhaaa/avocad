import { auth, database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { Environment, PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useWallet } from "@solana/wallet-adapter-react"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { onValue, ref, remove, set } from "firebase/database"
import { useEffect, useState } from "react"
import Map from "./map"
import MainPlayer from "./player/main"
import OtherPlayers from "./player/others"
import useMainPlayer from "@/hooks/useMainPlayer"

export default function Scene() {
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
  const user = useMainPlayer()

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
    <div className="w-screen h-screen bg-white">
      <Canvas>
        <ambientLight intensity={1} />
        <Environment files="outdoor.hdr" />

        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <MainPlayer id={publicKey?.toString()} />

        <OtherPlayers players={players} mainPlayerId={publicKey?.toString()} />

        <Map position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
