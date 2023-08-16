import { Players } from "@/types/player"
import { create } from "zustand"
import { persist } from "zustand/middleware"

type PlayerState = {
  mainUsername: string
  setMainUsername: (mainUsername: string) => void

  logedIn: boolean
  setLogedIn: (logedIn: boolean) => void

  players: Players | undefined
  setPlayers: (players: Players) => void
}

const usePlayerStore = create<PlayerState>()(
  persist(
    (set) => ({
      mainUsername: "",
      setMainUsername: (mainUsername) => set({ mainUsername }),

      logedIn: false,
      setLogedIn: (logedIn: boolean) => set({ logedIn }),

      players: undefined,
      setPlayers: (players: Players) => set({ players }),
    }),
    {
      name: "bear-storage",
      partialize: (state) => ({ logedIn: state.logedIn, mainUsername: state.mainUsername }),
    }
  )
)

export default usePlayerStore
