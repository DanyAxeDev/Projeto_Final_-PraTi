import { MdFavorite } from "react-icons/md"

type FavoriteButtonProps = {
  isFavorite: boolean
}

function FavoriteButton({ isFavorite }: FavoriteButtonProps) {
  return (
    <button 
    aria-label={isFavorite ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
    title={isFavorite ? "Remover pet dos favoritos" : "Adicionar pet aos favoritos"}
    className={`flex justify-center items-center size-11 rounded-full border-3 border-blue hover:border-darkblue focus:border-darkblue ${isFavorite ? "text-white bg-blue hover:bg-darkblue focus:bg-darkblue" : "text-blue hover:text-darkblue focus:text-darkblue"} transition-colors duration-300 cursor-pointer`}>
      <MdFavorite aria-hidden="true" className="text-[28px]" />
    </button>
  )
}

export default FavoriteButton
