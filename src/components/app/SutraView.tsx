import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ExternalLink } from "lucide-react"
import { useGetSutraQuery } from "@/api/sutras.api.ts"
import { useGetTransliterationQuery } from "@/api/transliteration.api"
import { useGetAudioQuery } from "@/api/audio.api"
import { Mode } from "@/types/types"
import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"
import HorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"

const SutraView = () => {
  const {
    sutra_no,
    valli_no,
    section,
    isComplete,
    incrementSutra,
    setChapter,
    setSection,
  } = useSutraStore()

  const { language } = useLanguageStore()

  useEffect(() => {
    setChapter(valli_no)
    setSection(section)
  }, [valli_no, setChapter, setSection, section])

  const { data, isLoading, error } = useGetSutraQuery(
    section,
    valli_no,
    sutra_no
  )
  const {
    data: transliteration,
    isLoading: isTransLoading,
    error: transError,
  } = useGetTransliterationQuery(section, valli_no, sutra_no, language)

  const { data: audioData } = useGetAudioQuery({
    section: section,
    chapter: valli_no,
    number: sutra_no,
    mode: Mode.Chant,
  })

  return (
    <div
      style={{
        backgroundImage: `url(${HorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Fixed Header */}
      {data && (
        <div className="sticky top-4 z-50 bg-transparent px-16 py-2 flex justify-between items-center text-lg font-bold text-darkbrown">
          <Link
            to="/anusarak.png"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Anusarak <ExternalLink size={20} />
          </Link>

          <p className="bg-darkbrown rounded-sm text-white flex items-center justify-center w-20 h-10">
              {valli_no >= 1 && valli_no <= 3
                ? `1.${valli_no}.${data.number}`
                : valli_no >= 4 && valli_no <= 6
                ? `2.${valli_no}.${data.number}`
                : "SM"}
          </p>

        </div>
      )}

      {/* Scrollable Content Box */}
      <div className="h-[210px] max-w-[90%] mx-auto overflow-y-auto pt-0 box-content">
        {isLoading && <CustomBeatLoader />}
        {error && <ErrorMessage error={error.message} />}

        {data && (
          <div className="font-bold text-darkorange mt-1 text-xl text-center">
            {data.text && <MultilineText text={data.text} />}
          </div>
        )}

        {isTransLoading && <CustomBeatLoader />}
        {transError && <ErrorMessage error={transError.message} />}

        {transliteration && (
          <p className="mt-4 text-darkbrown font-semibold text-center text-xl">
            {transliteration.text && (
              <MultilineText text={transliteration.text} />
            )}
          </p>
        )}

        {audioData?.file_path && (
          <div className="mt-4 flex justify-center">
            <audio
              src={`/static/${audioData.file_path}`}
              autoPlay
              onEnded={() => {
                if (!isComplete) {
                  setTimeout(() => {
                    incrementSutra()
                  }, 2000)
                }
              }}
            />
          </div>
        )}
      </div>

      <div className="pb-10" />
    </div>
  )
}

export default SutraView
