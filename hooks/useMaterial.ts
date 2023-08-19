import { create } from "zustand"

type MaterialState = {
  intersected: boolean
  setIntersected: (intersected: boolean) => void

  material: string
  setMaterial: (material: string) => void

  position: string
  setPosition: (position: string) => void
}

const useMaterial = create<MaterialState>((set) => ({
  intersected: false,
  setIntersected: (intersected: boolean) => set({ intersected }),

  material: "",
  setMaterial: (material: string) => set({ material }),

  position: "",
  setPosition: (position: string) => set({ position }),
}))

export default useMaterial
