import { create } from "zustand"

type InputModalState = {
  typing: boolean
  startType: () => void
  endType: () => void
}

const useInput = create<InputModalState>((set) => ({
  typing: false,
  startType: () => set({ typing: true }),
  endType: () => set({ typing: false }),
}))

export default useInput
