import { Philosophy } from "@/types/types"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { GLOBAL_CONFIG } from "./config"

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
})

type TBhashyam = {
  id: string
  text: string
  philosophy: Philosophy
}

const getBhashyam = async (
  section: number,
  chapter: number,
  number: number,
  philosophy: Philosophy
) => {
  const language = "sa" 
  const response = await api.get(
    `/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}/bhashyam?lang=${language}&phil=${philosophy}`
  )

  return response.data
}

export const useGetBhashyamQuery = (
  section: number,
  chapter: number,
  number: number,
  philosophy: Philosophy
) => {
  return useQuery<TBhashyam>({
    queryKey: ["bhashyams", section,  number, philosophy],
    queryFn: () => getBhashyam(section, chapter, number, philosophy),
  })
}
