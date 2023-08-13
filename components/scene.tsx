import { auth, database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { PerspectiveCamera } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { useWallet } from "@solana/wallet-adapter-react"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth"
import { onValue, ref, remove, set } from "firebase/database"
import { useEffect, useState } from "react"
import Map from "./map"
import MainPlayer from "./player/main"
import OtherPlayers from "./player/others"

export default function Scene() {
  const [isSignIn, setIsSignIn] = useState(false)
  const [mainPlayerUid, setMainPlayerUid] = useState("")

  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])

  const { publicKey } = useWallet()

  useEffect(() => {
    signInAnonymously(auth)
      .then(() => {
        setIsSignIn(true)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }, [])

  useEffect(() => {
    let uid: string

    // publicKey &&
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        uid = user.uid

        setMainPlayerUid(uid)
        await set(ref(database, `players/${uid}`), {
          id: uid,
          position: {
            x: 0,
            y: 0,
            z: 0,
          },
          quaternion: {
            x: 0,
            y: 0,
            z: 0,
            w: 0,
          },
        }).catch((error) => {})
      }
    })

    onValue(ref(database, "players"), (snapshot) => {
      setPlayers(snapshot.val())
    })

    window.addEventListener("beforeunload", (event) => {
      remove(ref(database, `players/${uid}`))
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isSignIn) return

    onValue(
      ref(database, "players"),
      (snapshot) => {
        setPlayers(snapshot.val())
      },
      {
        onlyOnce: true,
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn, publicKey])

  return (
    <div className="w-screen h-screen bg-base-100">
      <Canvas>
        <ambientLight intensity={1} />

        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <MainPlayer uid={mainPlayerUid} />
        <OtherPlayers players={players} mainPlayerId={mainPlayerUid} />

        <Map position={[0, -1, 0]} />
      </Canvas>
    </div>
  )
}
