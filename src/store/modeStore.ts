import { Mode } from "@/types/types"
import { create } from "zustand"

interface State {
  mode: Mode
}

interface Actions {
  setMode: (ptype: Mode) => void
}

const useModeStore = create<State & Actions>((set) => ({
  mode: Mode.Chant,
  setMode: (ptype) => set(() => ({ mode: ptype })),
}))

export default useModeStore
