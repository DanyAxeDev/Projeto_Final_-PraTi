import { Link } from "react-router"
import { MdEdit, MdDeleteForever } from "react-icons/md"
import type { MyPetProps } from "@/types/types"

function MyPet({ name, id, photo }: MyPetProps) {
  return (
    <div className="bg-white flex flex-col items-center gap-6 text-center p-5 rounded-sm w-fit sm:flex-row sm:w-full sm:items-start sm:text-start sm:gap-8">
      <div className="w-full h-[180px] rounded-sm overflow-clip sm:size-[150px]">
        <img src={photo} alt={`Foto de ${name}`} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-[28px]">{name}</h2>

        <Link 
        to={`/pet/${id}`} 
        className="font-semibold text-lg text-brown hover:underline underline-offset-4 mb-2 sm:self-start"
        >
          Ver perfil do pet
        </Link>

        <div className="flex justify-center items-center gap-4 flex-wrap sm:justify-start sm:gap-3">
          {/* Botão de editar */}
          <button 
          aria-label={`Editar informações de ${name}`}
          className="flex justify-center items-center text-2xl size-10 rounded-full bg-blue hover:bg-darkblue text-white cursor-pointer transition-colors duration-300"
          >
            <MdEdit aria-hidden="true" />
          </button>
          {/* Botão de excluir */}
          <button 
          aria-label={`Excluir perfil de ${name}`}
          className="flex justify-center items-center text-2xl size-10 rounded-full bg-red-400 hover:bg-darkred text-white cursor-pointer transition-colors duration-300"
          >
            <MdDeleteForever aria-hidden="true" />
          </button>
          {/* Botão de marcar como adotado */}
          <button className="font-bold text-brown rounded-full border-3 border-brown py-1 px-5 cursor-pointer transition-colors duration-300 hover:text-darkbrown hover:border-transparent">
            Marcar como adotado
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyPet
