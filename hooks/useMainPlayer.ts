import { create } from "zustand"
import { onValue, ref, set as setDB } from "firebase/database"
import { database } from "@/services/firebase"

type MainPlayerState = {
  username: string
  setUsername: (username: string) => void
  title: string
  setTitle: (title: string) => void
  existed: boolean
  setExisted: (existed: boolean) => void
  checkExisted: (publicKey: string) => void
  create: (username: string, publicKey: string) => void
}

const useMainPlayer = create<MainPlayerState>((set) => ({
  username: "",
  setUsername: (username: string) => set({ username }),
  title: "",
  setTitle: (title: string) => set({ title }),
  existed: true,
  setExisted: (existed: boolean) => set({ existed }),
  checkExisted: async (publicKey: string) => {
    try {
      onValue(
        ref(database, `players/${publicKey}`),
        (snapshot) => {
          console.log(snapshot.val())

          if (snapshot.val()) {
            set({ existed: true, username: snapshot.val().username })
          } else {
            set({ existed: false, username: snapshot.val().username })
          }
        },
        {
          onlyOnce: true,
        }
      )
    } catch (error) {
      console.log(error)
    }
  },
  create: async (username: string, publicKey: string) => {
    setDB(ref(database, `players/${publicKey}`), {
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
      username,
      animation: "idle",
      address: publicKey,
    })
  },
}))

export default useMainPlayer
