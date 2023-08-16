import { auth, database } from "@/services/firebase"
import usePlayerStore from "@/stores/player"
import { useWallet } from "@solana/wallet-adapter-react"
import { onValue, ref, remove, set } from "firebase/database"
import { useEffect, useState } from "react"
import Overlay from "./overlay"
import ConnectWallet from "./overlay/connect-wallet"
import Scene from "./scene"
import { onAuthStateChanged, signInAnonymously } from "firebase/auth"

export default function App() {
  const [logedIn, setLogedIn] = usePlayerStore((s) => [s.logedIn, s.setLogedIn])
  const [players, setPlayers] = usePlayerStore((state) => [state.players, state.setPlayers])
  const [mainPlayerUid, setMainPlayerUid] = useState("")
  const { connected } = useWallet()

  // useEffect(() => {
  //   signInAnonymously(auth)
  //     .then(() => {
  //       setLogedIn(true)
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code
  //       const errorMessage = error.message
  //       console.log(errorCode, errorMessage)
  //     })
  // }, [])

  useEffect(() => {
    // if (connected) {
    //   signInAnonymously(auth)
    //     .then(() => {
    //       setLogedIn(connected)
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code
    //       const errorMessage = error.message
    //       console.log(errorCode, errorMessage)
    //     })
    //   onValue(
    //     ref(database, "players"),
    //     (snapshot) => {
    //       setPlayers(snapshot.val())
    //     },
    //     {
    //       onlyOnce: true,
    //     }
    //   )
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected])

  return (
    <>
      {!logedIn ? (
        <ConnectWallet />
      ) : (
        <>
          <Scene />
          <Overlay />
        </>
      )}
    </>
  )
}
