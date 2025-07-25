import { create } from "zustand"

interface State {
  sutra_no: number
  valli_no: number // visible external name (Chapter)
  chapter: number  // internal mirror of valli_no for API use
  section: number  // Adhyaya
  isComplete: boolean
}

interface Actions {
  setSutraNo: (sutraNo: number) => void
  setValliNo: (valliNo: number) => void
  setChapter: (chapter: number) => void
  setSection: (section: number) => void
  setBoth: (valliNo: number, sutraNo: number) => void
  setAll: (section: number, valliNo: number, sutraNo: number) => void
  incrementSutra: () => void
  decrementSutra: () => void
  resetSutra: () => void
  nextValli: () => void
  prevValli: () => void
}

// Sutra count per (adhyaya, valli)
const MAX_SUTRAS: Record<string, number> = {
  "1-1": 29,
  "1-2": 25,
  "1-3": 17,
  "2-1": 15,
  "2-2": 15,
  "2-3": 18,
}

const MAX_ADHYAYA = 2
const MAX_VALLI_PER_ADHYAYA = 3

const useSutraStore = create<State & Actions>((set, get) => ({
  sutra_no: 1,
  valli_no: 0,
  chapter: 0,
  section: 0,
  isComplete: false,

  setSutraNo: (sutraNo) =>
    set(() => ({ sutra_no: sutraNo, isComplete: false })),

  setValliNo: (valliNo) =>
    set(() => ({
      valli_no: valliNo,
      chapter: valliNo,
      sutra_no: 1,
      isComplete: false,
    })),

  setChapter: (chapter) =>
    set(() => ({
      valli_no: chapter,
      chapter,
    })),

  setSection: (section) => set(() => ({ section })),

  setBoth: (valli, sutra) =>
    set(() => ({
      valli_no: valli,
      chapter: valli,
      sutra_no: sutra,
      isComplete: false,
    })),

  setAll: (section, valli, sutra) =>
    set(() => ({
      section,
      valli_no: valli,
      chapter: valli,
      sutra_no: sutra,
      isComplete: false,
    })),

  incrementSutra: () => {
    const { section, valli_no, sutra_no } = get()

    // Shanti Mantra → First real sutra
    if (section === 0 && valli_no === 0 && sutra_no === 1) {
      set(() => ({
        section: 1,
        valli_no: 1,
        chapter: 1,
        sutra_no: 1,
      }))
      return
    }

     // Last Sutra → Ending Shanti Mantra (0/7/1)
  if (section === 2 && valli_no === 3 && sutra_no === 18) {
    set(() => ({
      section: 0,
      valli_no: 7,
      chapter: 7,
      sutra_no: 1,
    }))
    return
  }

  // Ending Shanti Mantra → End
  if (section === 0 && valli_no === 7 && sutra_no === 1) {
    set(() => ({
      isComplete: true,
    }))
    return
  }

    const key = `${section}-${valli_no}`
    const maxSutra = MAX_SUTRAS[key] || 1

    if (sutra_no < maxSutra) {
      set(() => ({ sutra_no: sutra_no + 1 }))
    } else if (valli_no < MAX_VALLI_PER_ADHYAYA) {
      set(() => ({
        valli_no: valli_no + 1,
        chapter: valli_no + 1,
        sutra_no: 1,
      }))
    } else if (section < MAX_ADHYAYA) {
      set(() => ({
        section: section + 1,
        valli_no: 1,
        chapter: 1,
        sutra_no: 1,
      }))
    } else {
      set(() => ({ isComplete: true }))
    }
  },

  decrementSutra: () => {
    const { section, valli_no, sutra_no } = get()

    // From 1/1/1 → go back to Shanti Mantra (0/0/1)
    if (section === 1 && valli_no === 1 && sutra_no === 1) {
      set(() => ({
        section: 0,
        valli_no: 0,
        chapter: 0,
        sutra_no: 1,
        isComplete: false,
      }))
      return
    }
    
    // From (last Shanti Mantra) 0/7/1 → go back to (2/3/18)
    if (section === 0 && valli_no === 7 && sutra_no === 1) {
      set(() => ({
        section: 2,
        valli_no: 3,
        chapter: 3,
        sutra_no: 18,
        isComplete: false,
      }))
      return
    }

    if (sutra_no > 1) {
      set(() => ({ sutra_no: sutra_no - 1 }))
    } else if (valli_no > 1) {
      const prevValli = valli_no - 1
      const key = `${section}-${prevValli}`
      const maxPrevSutra = MAX_SUTRAS[key] || 1
      set(() => ({
        valli_no: prevValli,
        chapter: prevValli,
        sutra_no: maxPrevSutra,
      }))
    } else if (section > 1) {
      const prevSection = section - 1
      const prevValli = MAX_VALLI_PER_ADHYAYA
      const key = `${prevSection}-${prevValli}`
      const maxPrevSutra = MAX_SUTRAS[key] || 1
      set(() => ({
        section: prevSection,
        valli_no: prevValli,
        chapter: prevValli,
        sutra_no: maxPrevSutra,
      }))
    }
  },

  resetSutra: () =>
    set(() => ({
      sutra_no: 1,
      valli_no: 1,
      chapter: 1,
      section: 1,
      isComplete: false,
    })),

  nextValli: () => {
    const { valli_no, section } = get()
    if (valli_no < MAX_VALLI_PER_ADHYAYA) {
      const next = valli_no + 1
      set(() => ({
        valli_no: next,
        chapter: next,
        sutra_no: 1,
        isComplete: false,
      }))
    } else if (section < MAX_ADHYAYA) {
      set(() => ({
        section: section + 1,
        valli_no: 1,
        chapter: 1,
        sutra_no: 1,
        isComplete: false,
      }))
    }
  },

  prevValli: () => {
    const { valli_no, section } = get()
    if (valli_no > 1) {
      const prev = valli_no - 1
      const key = `${section}-${prev}`
      const maxSutra = MAX_SUTRAS[key] || 1
      set(() => ({
        valli_no: prev,
        chapter: prev,
        sutra_no: maxSutra,
        isComplete: false,
      }))
    } else if (section > 1) {
      const prevSection = section - 1
      const prevValli = MAX_VALLI_PER_ADHYAYA
      const key = `${prevSection}-${prevValli}`
      const maxSutra = MAX_SUTRAS[key] || 1
      set(() => ({
        section: prevSection,
        valli_no: prevValli,
        chapter: prevValli,
        sutra_no: maxSutra,
        isComplete: false,
      }))
    }
  },
}))

export default useSutraStore
