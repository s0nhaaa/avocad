import { create } from "zustand"

type LoginState = {
  logedIn: boolean
  login: () => void
  logout: () => void
}

const useLogin = create<LoginState>((set) => ({
  logedIn: false,
  login: () => set(() => ({ logedIn: true })),
  logout: () => set(() => ({ logedIn: false })),
}))

export default useLogin
