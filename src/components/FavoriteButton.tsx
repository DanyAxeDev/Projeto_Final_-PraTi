import { MdFavorite } from "react-icons/md"

type FavoriteButtonProps = {
  isFavorite: boolean
}

function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  return (
    <button 
    aria-label={isFavorite ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
    title={isFavorite ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
    className={`flex justify-center items-center size-10 rounded-full border-3 border-blue hover:border-darkblue ${isFavorite ? "text-white bg-blue hover:bg-darkblue" : "text-blue hover:text-darkblue"} transition-colors duration-300 cursor-pointer`}>
      <MdFavorite aria-hidden="true" className="text-2xl" />
    </button>
  )
}

export default FavoriteButton
