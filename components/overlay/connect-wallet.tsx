import usePlayerStore from "@/stores/player"
import { useWalletModal } from "@solana/wallet-adapter-react-ui"
import clsx from "clsx"
import { useState } from "react"

export default function ConnectWallet() {
  const { setVisible } = useWalletModal()
  const [setMainUsername] = usePlayerStore((s) => [s.setMainUsername])

  const [username, setUsername] = useState("holly-bear")

  const connect = () => {
    if (!username) return

    setMainUsername(username)
    setVisible(true)
  }

  return (
    <div className={clsx("modal", "modal-open")}>
      <div className="modal-box ">
        <h3 className="font-bold text-lg">Guac morning 🥑!</h3>
        <p className="pt-4">
          Just one step before you in. Make sure you&apos;re on <kbd className="kbd kbd-md">Devnet</kbd>
        </p>

        <div className="form-control w-full ">
          <label className="label cursor-c-auto">
            <span className="label-text">What GUAC are you?</span>
          </label>
          <input
            type="text"
            placeholder="Type your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="modal-action">
          <button className="btn btn-primary hover:cursor-c-pointer active:cursor-c-pointer-clicked" onClick={connect}>
            Hop in
          </button>
        </div>
      </div>
    </div>
  )
}
