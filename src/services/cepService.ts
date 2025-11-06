import axios from "axios"

export const findAddress = async (cep: string) => {
  if (!cep) return

  const baseUrl = `https://viacep.com.br/ws/${cep}/json/`

  const res = await axios.get(baseUrl)
  return res.data
}