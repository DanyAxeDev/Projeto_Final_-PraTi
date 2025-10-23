import { MdFavorite } from "react-icons/md"
import { petService } from "@/services/petService"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"
import { useState } from "react"

type FavoriteButtonProps = {
  petId: number
  isFavorite: boolean
  onToggle?: (newState: boolean) => void
}

function FavoriteButton({ petId, isFavorite, onToggle }: FavoriteButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [currentState, setCurrentState] = useState(isFavorite)
  const { user } = useUser()

  const handleToggle = async () => {
    if (!user || isLoading) return

    try {
      setIsLoading(true)
      
      if (currentState) {
        // Remover dos favoritos
        const result = await petService.removeFromFavorites(user.id, petId)
        if (result.success) {
          setCurrentState(false)
          onToggle?.(false)
          toast.success("Removido dos favoritos")
        } else {
          toast.error(result.error || "Erro ao remover dos favoritos")
        }
      } else {
        // Adicionar aos favoritos
        const result = await petService.addToFavorites(user.id, petId)
        if (result.success) {
          setCurrentState(true)
          onToggle?.(true)
          toast.success("Adicionado aos favoritos")
        } else {
          toast.error(result.error || "Erro ao adicionar aos favoritos")
        }
      }
    } catch (error) {
      toast.error("Erro inesperado")
      console.error("Favorite toggle error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button 
      onClick={handleToggle}
      disabled={isLoading || !user}
      aria-label={currentState ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
      title={currentState ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
      className={`flex justify-center items-center size-11 rounded-full border-3 border-blue hover:border-darkblue focus:border-darkblue ${currentState ? "text-white bg-blue hover:bg-darkblue focus:bg-darkblue" : "text-blue hover:text-darkblue focus:text-darkblue"} transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}>
      <MdFavorite aria-hidden="true" className="text-[28px]" />
    </button>
  )
}

export default FavoriteButton
