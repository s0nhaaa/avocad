import { create } from "zustand"
import { onValue, ref, set as setDB } from "firebase/database"
import { database } from "@/services/firebase"
import { formatAddress } from "@/utils"

type MainPlayerState = {
  username: string
  setUsername: (username: string) => void
  title: string
  setTitle: (title: string) => void
  existed: boolean
  setExisted: (existed: boolean) => void
  checkExisted: (publicKey: string) => void
  create: (publicKey: string, username: string, isHolder: boolean, init?: boolean) => void
}

const useMainPlayer = create<MainPlayerState>((set, get) => ({
  username: "",
  setUsername: (username: string) => set({ username }),
  title: "",
  setTitle: (title: string) => set({ title }),
  existed: true,
  setExisted: (existed: boolean) => set({ existed }),
  checkExisted: (publicKey: string) => {
    try {
      onValue(
        ref(database, `users/${publicKey}`),
        (snapshot) => {
          if (snapshot.val()) {
            console.log(snapshot.val())

            set({ existed: true, username: snapshot.val().username, title: snapshot.val().title })
          } else {
            set({ existed: false, username: formatAddress(publicKey), title: "" })
          }
        },
        {
          onlyOnce: true,
        }
      )
    } catch (error) {
      set({ existed: false, username: formatAddress(publicKey), title: "" })
      console.log(error)
    }
  },
  create: (publicKey: string, username: string, isHolder: boolean, init = false) => {
    init &&
      setDB(ref(database, `users/${publicKey}`), {
        username,
        address: publicKey,
        title: isHolder ? "$GUAC Holder" : "",
      })
    setDB(ref(database, `players/${publicKey}`), {
      position: {
        x: 3,
        y: 0,
        z: 3,
      },
      quaternion: {
        x: 0,
        y: 0,
        z: 0,
        w: 0,
      },
      title: isHolder ? "$GUAC Holder" : "",
      username,
      animation: "idle",
      address: publicKey,
    })
  },
}))

export default useMainPlayer
