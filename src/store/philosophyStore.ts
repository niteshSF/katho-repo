import { Philosophy } from "@/types/types"
import { create } from "zustand"

interface State {
  philosophy: Philosophy
}

interface Actions {
  setPhilosophy: (ptype: Philosophy) => void
}

const usePhilosophyStore = create<State & Actions>((set) => ({
  philosophy: Philosophy.Advaitha,
  setPhilosophy: (ptype) => set(() => ({ philosophy: ptype })),
}))

export default usePhilosophyStore
