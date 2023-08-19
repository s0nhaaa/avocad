import { create } from "zustand"

type EditUsernameModalState = {
  opened: boolean
  open: () => void
  close: () => void
}

const useEditUsernameModal = create<EditUsernameModalState>((set) => ({
  opened: false,
  open: () => set({ opened: true }),
  close: () => set({ opened: false }),
}))

export default useEditUsernameModal
