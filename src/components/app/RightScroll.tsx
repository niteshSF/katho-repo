"use client"

import VScrollImg from "@/assets/vertical_scroll.png"
import TexturedButton from "../shared/TexturedButton"
import LanguageSelect from "./LanguageSelect"
import useSutraStore from "@/store/sutraStore"
import { useGetSutraListQuery } from "@/api/sutras.api.ts"
import ErrorMessage from "../shared/ErrorMessage"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import SearchBar from "./SearchBar"

interface Valli {
  section?: number
  number: number
  sutra_list: (number | "next")[]
}

const SHANTI_1 = 0
const SHANTI_2 = 7
const DEFAULT_SUTRA = 1

const RightScroll = ({ isCommentary }: { isCommentary: boolean }) => {
  const { section, setSection, chapter, setChapter, setValliNo, setSutraNo } = useSutraStore()

  const setAllThree = (section: number, valli: number, sutra: number) => {
    setSection(section)
    setChapter(valli)
    setValliNo(valli)
    setSutraNo(sutra)
  }

  const { error, isLoading } = useGetSutraListQuery()

  // NOTE: valli_list is hardcoded since you are using only Vallis 1-3 in section 1 and Vallis 1-3 in section 2
  const data: { valli_list: Valli[] } = {
    valli_list: [
      { section: 1, number: 1, sutra_list: Array(29).fill(0).map((_, i) => i + 1) },
      { section: 1, number: 2, sutra_list: Array(25).fill(0).map((_, i) => i + 1) },
      { section: 1, number: 3, sutra_list: Array(17).fill(0).map((_, i) => i + 1) },
      { section: 2, number: 1, sutra_list: Array(15).fill(0).map((_, i) => i + 1) },
      { section: 2, number: 2, sutra_list: Array(15).fill(0).map((_, i) => i + 1) },
      { section: 2, number: 3, sutra_list: Array(18).fill(0).map((_, i) => i + 1) },
    ],
  }

  const adhyaya1 = data.valli_list.filter((v) => v.section === 1)
  const adhyaya2 = data.valli_list.filter((v) => v.section === 2)

  const inAdhyaya1 = adhyaya1.some((k) => k.number === chapter && k.section === section)
const inAdhyaya2 = adhyaya2.some((k) => k.number === chapter && k.section === section)


  const firstSutra = (sutras: (number | "next")[]) =>
    (sutras.find((s) => typeof s === "number") as number | undefined) ?? DEFAULT_SUTRA

  return (
    <div
      className="h-[640px] w-[250px] bg-cover bg-no-repeat flex flex-col items-center"
      style={{
        backgroundImage: `url(${VScrollImg})`,
        backgroundSize: "100% 100%",
        minWidth: "250px",
      }}
    >
      <div className="flex flex-col items-center mx-8 ml-10 mt-8 w-full">
        <SearchBar />
        <LanguageSelect isCommentary={!isCommentary} />

        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        {/* ──────── ŚĀNTI MANTRA 1 ──────── */}
        <TexturedButton
          className="mt-4 w-56 h-12 flex items-center justify-center"
          selected={chapter === SHANTI_1}
          onClick={() => setAllThree(0, SHANTI_1, DEFAULT_SUTRA)}
        >
          Shanti Mantra
        </TexturedButton>

        {/* ───────── ADHYĀYA 1 ───────── */}
        <TexturedButton
          className="mt-1"
          selected={inAdhyaya1}
          disabled={inAdhyaya1}
        >
          ADHYĀYA - 1
        </TexturedButton>

        {adhyaya1.map((item, idx) => (
          <TexturedButton
            key={`1-${item.number}`}
            selected={chapter === item.number && section === item.section}
            onClick={() => setAllThree(1, item.number, firstSutra(item.sutra_list))}
            className="-mt-1"
          >
            Valli {idx + 1}
          </TexturedButton>
        ))}

        {/* ───────── ADHYĀYA 2 ───────── */}
        <TexturedButton
          className="mt-2"
          selected={inAdhyaya2}
          disabled={inAdhyaya2}
        >
          ADHYĀYA - 2
        </TexturedButton>

        {adhyaya2.map((item, idx) => (
          <TexturedButton
            key={`2-${item.number}`}
            // selected={chapter === item.number && item.section === 2}
            selected={chapter === item.number && section === item.section}
            onClick={() => setAllThree(2, item.number, firstSutra(item.sutra_list))}
            className="-mt-1"
          >
            Valli {idx + 1}
          </TexturedButton>
        ))}

        {/* ──────── ŚĀNTI MANTRA 2 ──────── */}
        <TexturedButton
          className="mt-2 w-56 h-12 flex items-center justify-center"
          selected={chapter === SHANTI_2}
          onClick={() => setAllThree(0, SHANTI_2, DEFAULT_SUTRA)}
        >
          Shanti Mantra
        </TexturedButton>
      </div>
    </div>
  )
}

export default RightScroll
