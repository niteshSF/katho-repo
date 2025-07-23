import { Language } from "@/types/types"
import { create } from "zustand"

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
}

const useLanguageStore = create<LanguageState>((set) => ({
  language: Language.English,
  setLanguage: (lang) => set(() => ({ language: lang })),
}))

export default useLanguageStore
