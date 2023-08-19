import useLogin from "@/hooks/useLogin"
import useMainPlayer from "@/hooks/useMainPlayer"
import { TOKEN_PROGRAM_ID } from "@solana/spl-token"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { GetProgramAccountsFilter, PublicKey } from "@solana/web3.js"
import { useEffect } from "react"
import Overlay from "./overlay"
import Login from "./overlay/login"
import Scene from "./scene"
import { ref, remove } from "firebase/database"
import { database } from "@/services/firebase"

export default function App() {
  const [logedIn, login, logout] = useLogin((s) => [s.logedIn, s.login, s.logout])
  const { publicKey } = useWallet()
  const { connection } = useConnection()
  const user = useMainPlayer()

  const isGUACHolder = async (publicKey: PublicKey) => {
    const filters: GetProgramAccountsFilter[] = [
      {
        dataSize: 165,
      },
      {
        memcmp: {
          offset: 32,
          bytes: publicKey.toBase58(),
        },
      },
    ]
    const accounts = await connection.getParsedProgramAccounts(TOKEN_PROGRAM_ID, { filters: filters })
    if (accounts.length === 0) return false
    let isHolder = false

    accounts.forEach(({ account }) => {
      if ((account.data as any).parsed.info.mint === "AZsHEMXd36Bj1EMNXhowJajpUXzrKcK57wW4ZGXVa7yR") isHolder = true
    })

    return isHolder
  }

  useEffect(() => {
    if (!publicKey) return
    if (!user.username) return

    const up = async () => {
      const isHolder = await isGUACHolder(publicKey)

      user.checkExisted(publicKey.toString())
      if (user.existed) {
        login()
        user.create(publicKey.toString(), user.username, isHolder)
      } else {
        logout()
        user.create(publicKey.toString(), user.username, isHolder, true)
      }
    }

    up()

    return () => {
      remove(ref(database, `players/${publicKey.toString()}`))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publicKey, user.existed, user.username])

  return (
    <>
      {!logedIn ? (
        <Login />
      ) : (
        <>
          <Scene />
          <Overlay />
        </>
      )}
    </>
  )
}
