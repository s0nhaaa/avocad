import useLogin from "@/hooks/useLogin"
import Overlay from "./overlay"
import Login from "./overlay/login"
import Scene from "./scene"
import { useEffect } from "react"
import { useWallet } from "@solana/wallet-adapter-react"
import useMainPlayer from "@/hooks/useMainPlayer"

export default function App() {
  const [logedIn, login, logout] = useLogin((s) => [s.logedIn, s.login, s.logout])
  const { publicKey } = useWallet()
  const user = useMainPlayer()

  useEffect(() => {
    if (!publicKey) return

    user.checkExisted(publicKey.toString())
    user.existed ? login() : logout()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, user.existed])

  return (
    <>
      {!logedIn ? (
        <Login />
      ) : (
        <>
          <Scene />
          {/* <Overlay /> */}
        </>
      )}
    </>
  )
}
