import useEditUsernameModal from "@/hooks/useEditUsernameModal"
import useInput from "@/hooks/useInput"
import useMainPlayer from "@/hooks/useMainPlayer"
import { database } from "@/services/firebase"
import { useWallet } from "@solana/wallet-adapter-react"
import { ref, update } from "firebase/database"
import React, { useState } from "react"

export default function EditUsernameModal() {
  const { publicKey } = useWallet()
  const [opened, open, close] = useEditUsernameModal((s) => [s.opened, s.open, s.close])
  const me = useMainPlayer()
  const [username, setUsername] = useState(me.username)
  const [startType, endType] = useInput((s) => [s.startType, s.endType])

  const changeUsername = () => {
    if (!publicKey) return

    update(ref(database, `users/${publicKey.toString()}`), {
      username,
    })
    update(ref(database, `players/${publicKey.toString()}`), {
      username,
    })
    me.setUsername(username)
    close()
  }

  return (
    <div className={`modal ${opened && "modal-open"}`}>
      <div className="modal-box">
        <h3 className="font-bold text-lg">BAAAAARS</h3>
        <p className="py-4 text-primary-content/60">Change BARS name</p>
        <div className="form-control w-full ">
          <input
            onFocus={startType}
            onBlur={endType}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="Name the bars"
            className="input input-bordered w-full "
          />
        </div>
        <div className="modal-action">
          <button className="btn normal-case" onClick={close}>
            Nah
          </button>
          <button
            className="btn normal-case btn-primary"
            onClick={changeUsername}
            disabled={!(username.length < 12) || !(username.length > 3)}
          >
            Change 🥑
          </button>
        </div>
      </div>
    </div>
  )
}
