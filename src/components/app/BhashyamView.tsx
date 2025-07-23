/* eslint-disable react-hooks/rules-of-hooks */
import LargeHorizontalScroll from "@/assets/large_horizontal_scroll.png"
import ErrorMessage from "../shared/ErrorMessage"
import useBhashyamStore from "@/store/bhashyamStore"
import useLanguageStore from "@/store/languageStore"
import usePhilosophyStore from "@/store/philosophyStore"
import { useGetBhashyamQuery } from "@/api/bhashyam.api"
import CustomBeatLoader from "../shared/CustomBeatLoader"
import MultilineText from "../shared/MultilineText"
import TexturedButton from "../shared/TexturedButton"
import { Philosophy } from "@/types/types"

const BhashyamView = () => {
    const { section } = useBhashyamStore()
    const { valli_no } = useBhashyamStore()
    const { bhashyam_no } = useBhashyamStore()
    const { language } = useLanguageStore()
    const { philosophy, setPhilosophy } = usePhilosophyStore()

    // Ensure that all required variables are defined before querying
    if (!valli_no || bhashyam_no || !language || !philosophy) {
        return <ErrorMessage error={"Required data is missing. Please try again."} />
    }

    // Fetch Interpretation Data
    const {
        error: bhashyamError,
        isLoading: bhashyamLoading,
        data: bhashyamData,
    } = useGetBhashyamQuery(section, valli_no, bhashyam_no, philosophy)

    return (
        <div 
            style={{
                backgroundImage: `url(${LargeHorizontalScroll})`,
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div className="pt-8"></div>

            <div className="flex justify-center">
                <TexturedButton
                    selected={philosophy === Philosophy.Advaitha}
                    onClick={() => setPhilosophy(Philosophy.Advaitha)}
                >
                    Advaitha
                </TexturedButton>
                <TexturedButton
                    selected={philosophy === Philosophy.Dvaitha}
                    onClick={() => setPhilosophy(Philosophy.Dvaitha)}
                >
                    Dvaitha
                </TexturedButton>
                <TexturedButton
                    selected={philosophy === Philosophy.Vishishtadvaita}
                    onClick={() => setPhilosophy(Philosophy.Vishishtadvaita)}
                >
                    Vishishtadvaita
                </TexturedButton>
            </div>

            <div className="h-[350px] max-w-[90%] mx-auto overflow-y-auto">
                {bhashyamLoading && <CustomBeatLoader />}
                {bhashyamError && <ErrorMessage error={"No Bhashyam found"} />}
                <div className="font-semibold text-darkbrown px-4 pt-2 text-lg">
                    {bhashyamData && <MultilineText text={bhashyamData?.text} gap={4} />}
                </div>
            </div>

            <div className="pb-14"></div>
        </div>
    )
}

export default BhashyamView
