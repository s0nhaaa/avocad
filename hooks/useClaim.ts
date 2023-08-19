import { create } from "zustand"

type ClaimState = {
  materials: string[]
  claim: (material: string) => void
  deleteClaimed: () => void
}

const useClaim = create<ClaimState>((set) => ({
  materials: [],
  claim: (material: string) => set((state) => ({ materials: [...state.materials, material] })),
  deleteClaimed: () => set({ materials: [] }),
}))

export default useClaim
