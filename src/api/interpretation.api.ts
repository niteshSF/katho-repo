import { Language, Philosophy } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TInterpretation = {
  id: number
  text: string
  language: Language
  philosophy: Philosophy
}

const getInterpretation = async (
  section: number,
  chapter: number,
  number: number,
  lang: Language,
  philosophy: Philosophy
) => {
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}/interpretation?lang=${lang}&phil=${philosophy}`
  )
  
  return response.data
}

export const useGetInterpretationQuery = (
  section: number,
  chapter: number,
  number: number,
  lang: Language,
  philosophy: Philosophy
) => {
  return useQuery<TInterpretation>({
    queryKey: ["interpretations", section, chapter, number, lang, philosophy],
    queryFn: () => getInterpretation(section, chapter, number, lang, philosophy),
  })
}
