import { useContext } from "react"
import { UserContext } from "@/context/userContext"

// Hook personalizado para utilizar o contexto do usuário em outros componentes
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error("useUser precisa ser utilizado dentro de um Provider.")
  return context
}