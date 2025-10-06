import axios from "axios"
import type { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

export const uploadImage = async (file: File) => {
  if (!file) return

  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "petconect_preset")
  formData.append("cloud_name", "dk2h9n5m0")

  // Envia a imagem pra nuvem, que devolve uma url para acessá-la
  const res: UploadApiResponse | UploadApiErrorResponse = await axios.post("https://api.cloudinary.com/v1_1/dk2h9n5m0/image/upload", formData)

  return res.data.url // Retorna a url da imagem armazenada na nuvem
}