import { Language } from "@/types/types"
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

type TTransliteration = {
  id: number
  text: string
  language: Language
}

const getTransliteration = async (
  section: number,
  chapter: number,
  number: number,
  lang: Language
) => {
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}/transliteration?lang=${lang}`
  )
  return response.data
}

export const useGetTransliterationQuery = (
  section: number,
  chapter: number,
  number: number,
  lang: Language
) => {
  return useQuery<TTransliteration>({
    queryKey: ["transliterations", section, chapter, number, lang],
    queryFn: () => getTransliteration(section, chapter, number, lang),
  })
}