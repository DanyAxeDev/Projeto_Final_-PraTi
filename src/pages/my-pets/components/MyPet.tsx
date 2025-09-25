import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { MdEdit, MdDeleteForever } from "react-icons/md"
import type { MyPetProps } from "@/types/types"
import AdoptedButton from "./AdoptedButton"
import Modal from "@/components/Modal"
import RoundButton from "@/components/RoundButton"
import petBalloon from "@/assets/imgs/dog-balloon.png"

function MyPet({ name, id, photo }: MyPetProps) {
  const [modal, setModal] = useState(false)

  const navigate = useNavigate()

  // Função para apagar pet do banco de dados quando for marcado como adotado
  const handleAdopted = () => {
    console.log("Pet adotado!")
  }

  return (
    <div className="bg-white flex flex-row items-start gap-6 p-4 rounded-sm w-fit sm:w-full sm:gap-8 sm:p-5">
      <div className="size-[100px] min-w-[100px] rounded-sm overflow-clip sm:size-[150px]">
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

        <div className="flex items-center gap-3 flex-wrap sm:justify-start sm:gap-4">
          {/* Botão de editar */}
          <button 
          onClick={() => navigate(`/editar-pet/${id}`)}
          aria-label={`Editar informações de ${name}`}
          className="flex justify-center items-center text-2xl size-10 rounded-full bg-blue hover:bg-darkblue focus:bg-darkblue text-white cursor-pointer transition-colors duration-300"
          >
            <MdEdit aria-hidden="true" />
          </button>
          {/* Botão de excluir */}
          <button 
          aria-label={`Excluir perfil de ${name}`}
          className="flex justify-center items-center text-2xl size-10 rounded-full bg-red-400 hover:bg-darkred focus:bg-darkred text-white cursor-pointer transition-colors duration-300"
          >
            <MdDeleteForever aria-hidden="true" />
          </button>
          {/* Botão de marcar como adotado */}
          <AdoptedButton openModal={() => setModal(true)} />

          <Modal isModalOpen={modal} closeModal={() => setModal(false)} title="Parabéns pela doação!">
            <p>Ficamos muito felizes em saber que mais um bichinho conseguiu conectar o fio azul com seu humano e está em um novo lar. Continue com a doação responsável!</p>
            <img src={petBalloon} alt="Ilustração de cachorro com balões" className="size-[170px] sm:size-auto" />
            <hr className="w-4/5" />
            <p className="text-sm">Se pressionou o botão por engano, clique em Cancelar.</p>
            <div className="flex gap-3 mt-4 sm:gap-4">
              <RoundButton color="brown" text="Cancelar" onClick={() => setModal(false)} />
              <RoundButton color="blue" text="Ok" onClick={handleAdopted} />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default MyPet
