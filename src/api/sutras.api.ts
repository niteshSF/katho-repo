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

type TSutra = {
  id: number
  number: number
  text: string
  chapter: number
  section: number
}

type TSutraList = {
  id: number
  number: number
  chapter: number
  section: number
}

const getSutra = async (section: number, chapter: number, number: number) => {
  // console.log("API call:", `/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}`)  
  const response = await api.get(`/sutras/${GLOBAL_CONFIG.upanishad}/${section}/${chapter}/${number}`);
  return response.data;
};


export const useGetSutraQuery = (section: number, chapter: number, number: number) => {
  return useQuery<TSutra>({
    queryKey: ["sutras", section, chapter, number],
    queryFn: () => getSutra(section, chapter, number),
  })
}

const getSutraList = async () => {
  const response = await api.get(`/sutras/?project_name=${GLOBAL_CONFIG.upanishad}`)
  return response.data
}

export const useGetSutraListQuery = () => {
  return useQuery<TSutraList[]>({
    queryKey: ["sutras"],
    queryFn: getSutraList,
  })
}
