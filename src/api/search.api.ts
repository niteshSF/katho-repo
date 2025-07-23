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

export type TResult = {
  text: string
  section: number
  khanda_no: number
  sutra_no: number
  chapter: number 
  mode: string
  lang: Language
}

// ────────────────── Get Results Function ──────────────────────────────
const getResult = async (term: string): Promise<TResult[]> => {
  if (term.length === 0) return []

  try {
    const response = await api.get(`/search/${GLOBAL_CONFIG.upanishad}/${term}`)

    if (Array.isArray(response.data)) {
      return response.data
    } else {
      console.warn("Unexpected response format")
      return []
    }
  } catch (error) {
    console.error("Search API error:", error)
    return []
  }
}

// ────────────────────────────────── Hook ──────────────────────────────────────
export const useGetResultQuery = (term: string) => {
  return useQuery<TResult[]>({
    queryKey: ["search", term],
    queryFn: () => getResult(term),
    enabled: term.trim().length > 0, // only when term is non-empty
  })
}
