// import { Section } from "lucide-react"
import { create } from "zustand"

interface State {
  sutra_no: number
  valli_no: number
  chapter: number
  section: number
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

const MAX_SUTRA_PER_VALLI: Record<number, number> = {
  0: 0, // Shanti Mantra before Adhyaya-1
  1: 29,
  2: 25,
  3: 17,
  4: 15,
  5: 15,
  6: 18,
}
// const MAX_VALLI = Object.keys(MAX_SUTRA_PER_VALLI).length
const MAX_VALLI_PER_ADHYAYA: Record<number, number> = {
  0: 0,
  1: 3,
  2: 3,
}
const MAX_ADHYAYA = Object.keys(MAX_VALLI_PER_ADHYAYA).length

const useSutraStore = create<State & Actions>((set, get) => ({
  sutra_no: 1,
  valli_no: 0,
  chapter: 1,
  section: 0,
  isComplete: false,

  setSutraNo: (sutraNo) =>
    set(() => ({ sutra_no: sutraNo, isComplete: false })),
  setValliNo: (valliNo) =>
    set(() => ({
      valli_no: valliNo,
      sutra_no: 1,
      chapter: valliNo,
      isComplete: false,
    })),
  setChapter: (chapter) => set(() => ({ chapter })),
  setSection: (section) => set(() => ({ section })),
  setBoth: (valli, sutra) =>
    set(() => ({
      valli_no: valli,
      sutra_no: sutra,
      chapter: valli,
      isComplete: false,
    })),

  setAll: (section, valli, sutra) =>
    set(() => ({
      valli_no: valli,
      sutra_no: sutra,
      chapter: valli,
      section: section,
      isComplete: false,
    })),
  incrementSutra: () => {
    const { sutra_no, valli_no, section } = get()
    const maxValli = MAX_VALLI_PER_ADHYAYA[section]
    const maxSutra = MAX_SUTRA_PER_VALLI[valli_no]
    // console.log("incrementSutra: section:", section, ' valli:', valli_no, " sutra", sutra_no, "maxSutra", maxSutra, "maxValli", maxValli)

    // Last sutra of last kanda — stop
    if (
      section === MAX_ADHYAYA &&
      valli_no === maxValli &&
      sutra_no === maxSutra
    ) {
      set(() => ({ isComplete: true }))
      return
    }

    // Normal increment
    // console.log("Normal increment") //: section:", section, ' valli:', valli_no, " sutra", sutra_no)
    if (sutra_no < maxSutra) {
      set(() => ({ sutra_no: sutra_no + 1 }))
    } else if (valli_no < maxValli) {
      const nextValli = valli_no + 1
      // console.log("nextValli", nextValli)
      set(() => ({
        valli_no: nextValli,
        chapter: nextValli,
        sutra_no: 1,
      }))
    } else if (section < MAX_ADHYAYA) {
      const nextSection = section + 1
      const nextValli = 1 // MAX_VALLI_PER_ADHYAYA[nextSection] || 1
      // const maxSutraNext = MAX_SUTRA_PER_VALLI[nextValli] || 1
      // console.log("nextSection", nextSection, "nextValli", nextValli, "maxSutraNext", maxSutraNext)
      set(() => ({
        section: nextSection,
        valli_no: nextValli,
        chapter: nextValli,
        sutra_no: 1, // maxSutraNext,
      }))
    }
  },

  decrementSutra: () => {
    const { sutra_no, valli_no } = get()

    if (sutra_no > 1) {
      set(() => ({ sutra_no: sutra_no - 1 }))
    } else if (valli_no > 1) {
      const prevValli = valli_no - 1
      const maxSutraPrev = MAX_SUTRA_PER_VALLI[prevValli] || 1
      set(() => ({
        valli_no: prevValli,
        chapter: prevValli,
        sutra_no: maxSutraPrev,
      }))
    }
  },

  resetSutra: () =>
    set(() => ({
      sutra_no: 1,
      valli_no: 1,
      chapter: 1,
      section: 0,
      isComplete: false,
    })),

  nextValli: () => {
    const { valli_no, section } = get()
    let nextSection = section
    if (valli_no === MAX_VALLI_PER_ADHYAYA[section]) {
      nextSection = section + 1 <= MAX_ADHYAYA ? section + 1 : section
    }
    const next =
      valli_no + 1 <= MAX_VALLI_PER_ADHYAYA[section] ? valli_no + 1 : valli_no
    set(() => ({
      section: nextSection,
      valli_no: next,
      sutra_no: 1,
      chapter: next,
      isComplete: false,
    }))
  },

  prevValli: () => {
    const { valli_no } = get()
    const prev = valli_no - 1 >= 1 ? valli_no - 1 : valli_no
    const maxSutra = MAX_SUTRA_PER_VALLI[prev] || 1
    set(() => ({
      valli_no: prev,
      sutra_no: maxSutra,
      chapter: prev,
      isComplete: false,
    }))
  },
}))

export default useSutraStore
