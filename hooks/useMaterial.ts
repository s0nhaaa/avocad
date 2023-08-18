import { create } from "zustand"

type MaterialState = {
  intersected: boolean
  setIntersected: (intersected: boolean) => void

  material: string
  setMaterial: (material: string) => void
}

const useMaterial = create<MaterialState>((set) => ({
  intersected: false,
  setIntersected: (intersected: boolean) => set({ intersected }),

  material: "",
  setMaterial: (material: string) => set({ material }),
}))

export default useMaterial
