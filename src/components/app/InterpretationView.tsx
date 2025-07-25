import LargeHorizontalScroll from "@/assets/horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useSutraStore from "@/store/sutraStore"
import useLanguageStore from "@/store/languageStore"
import usePhilosophyStore from "@/store/philosophyStore"

import { useGetInterpretationQuery } from "@/api/interpretation.api"
import { useGetBhashyamQuery } from "@/api/bhashyam.api"

import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"
import TexturedButton from "../shared/TexturedButton"
import { Philosophy } from "@/types/types"
import { Switch } from "../ui/switch"
import { useState } from "react"

const InterpretationView = () => {
  const { sutra_no, valli_no, section } = useSutraStore()
  const { language } = useLanguageStore()
  const { philosophy, setPhilosophy } = usePhilosophyStore()

  const [isCommentary, setIsCommentary] = useState(true)

  // Fetch commentary (interpretation)
  const {
    error: interpretationError,
    isLoading: interpretationLoading,
    data: interpretationData,
  } = useGetInterpretationQuery(section, valli_no, sutra_no, language, philosophy)

  // Fetch bhashyam
  const {
    error: bhashyamError,
    isLoading: bhashyamLoading,
    data: bhashyamData,
  } = useGetBhashyamQuery(section, valli_no, sutra_no, philosophy)

  const getStatusCode = (error: unknown) => {
    if (error && typeof error === "object" && "status" in error) {
      return (error as { status: number }).status
    }
    return null
  }

  return (
    <div
      style={{
        backgroundImage: `url(${LargeHorizontalScroll})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="pt-8"></div>

      {/* Header Controls */}
      <div className="flex justify-center items-center ml-10">
        {/* Toggle Switch */}
        <div className="flex justify-center items-center mb-1 mr-5">
          <h1
            className={`mr-4 ${!isCommentary ? "font-bold" : ""}`}
            style={{ color: "#EF400B", fontWeight: "bold" }}
          >
            Bhashyam
          </h1>
          <Switch
            checked={isCommentary}
            onCheckedChange={(checked) => setIsCommentary(checked)}
          />
          <h1
            className={`ml-4 ${isCommentary ? "font-bold" : ""}`}
            style={{ color: "#EF400B", fontWeight: "bold" }}
          >
            Commentary
          </h1>
        </div>

        {/* Philosophy Selector */}
        <TexturedButton
          selected={philosophy === Philosophy.Advaitha}
          onClick={() => setPhilosophy(Philosophy.Advaitha)}
        >
          Advaita
        </TexturedButton>
        <TexturedButton
          selected={philosophy === Philosophy.Dvaitha}
          onClick={() => setPhilosophy(Philosophy.Dvaitha)}
        >
          Dvaita
        </TexturedButton>
        <TexturedButton
          selected={philosophy === Philosophy.Vishishtadvaita}
          onClick={() => setPhilosophy(Philosophy.Vishishtadvaita)}
        >
          Vishishtadvaita
        </TexturedButton>

        {/* Sutra Reference Display */}

              <p className="bg-darkbrown rounded-sm text-white flex items-center justify-center font-bold w-20 h-10 mt-1 ml-10">
                {section === 0 ? "SM" : `${section}.${valli_no}.${sutra_no}`} 
              </p>
       

      </div>

      {/* Text Area */}
      <div className="h-[380px] max-w-[90%] mx-auto overflow-y-auto">
        {isCommentary ? (
          <>
            {interpretationLoading && <CustomBeatLoader />}
            {interpretationError && (
              <ErrorMessage
                error={
                  getStatusCode(interpretationError) === 404
                    ? "No commentary available for the selected sutra."
                    : "An error occurred while fetching commentary."
                }
              />
            )}
            {interpretationData && (
              <div className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                <MultilineText text={interpretationData.text} gap={4} />
              </div>
            )}
          </>
        ) : (
          <>
            {bhashyamLoading && <CustomBeatLoader />}
            {bhashyamError && (
              <ErrorMessage
                error={
                  getStatusCode(bhashyamError) === 404
                    ? "No bhashyam available for the selected sutra."
                    : "An error occurred while fetching bhashyam."
                }
              />
            )}
            {bhashyamData?.text ? (
              <div className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                <MultilineText text={bhashyamData.text} gap={4} />
              </div>
            ) : (
              <p className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                No bhashyam available for the selected sutra.
              </p>
            )}
          </>
        )}
      </div>

      <div className="pb-14"></div>
    </div>
  )
}

export default InterpretationView
