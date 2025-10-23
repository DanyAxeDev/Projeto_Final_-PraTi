import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { MdEdit, MdDeleteForever } from "react-icons/md"
import type { MyPetProps } from "@/types/types"
import AdoptedButton from "./AdoptedButton"
import Modal from "@/components/Modal"
import RoundButton from "@/components/RoundButton"
import petBalloon from "@/assets/imgs/dog-balloon.png"
import { petService } from "@/services/petService"
import { toast } from "sonner"

interface MyPetPropsWithCallback extends MyPetProps {
  onPetDeleted?: () => void;
  available?: boolean;
}

function MyPet({ name, id, photo, available = true, onPetDeleted }: MyPetPropsWithCallback) {
  const [modal, setModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // Função para marcar pet como adotado (marcar como não disponível)
  const handleAdopted = async () => {
    setLoading(true)
    try {
      const result = await petService.markAsAdopted(id)

      if (result.success) {
        toast.success("Pet marcado como adotado com sucesso!")
        setModal(false)
        // Atualizar a lista de pets
        onPetDeleted?.()
      } else {
        toast.error(result.error || "Erro ao marcar pet como adotado")
      }
    } catch (error) {
      console.error("Erro ao marcar pet como adotado:", error)
      toast.error("Erro inesperado ao marcar pet como adotado")
    } finally {
      setLoading(false)
    }
  }

  // Função para deletar pet
  const handleDelete = async () => {
    setLoading(true)
    try {
      const result = await petService.deletePet(id)

      if (result.success) {
        toast.success("Pet deletado com sucesso!")
        setDeleteModal(false)
        // Atualizar a lista de pets
        onPetDeleted?.()
      } else {
        toast.error(result.error || "Erro ao deletar pet")
      }
    } catch (error) {
      console.error("Erro ao deletar pet:", error)
      toast.error("Erro inesperado ao deletar pet")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white flex flex-row items-start gap-6 p-4 rounded-sm w-fit sm:w-full sm:gap-8 sm:p-5">
      <div className="size-[100px] min-w-[100px] rounded-sm overflow-clip sm:size-[150px]">
        <img src={photo} alt={`Foto de ${name}`} className="w-full h-full object-cover" />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-[28px]">{name}</h2>
          {!available && (
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              🎉 Adotado
            </span>
          )}
        </div>

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
            onClick={() => setDeleteModal(true)}
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
              <RoundButton
                color="blue"
                text={loading ? "Processando..." : "Ok"}
                onClick={handleAdopted}
              />
            </div>
          </Modal>

          {/* Modal de confirmação de exclusão */}
          <Modal isModalOpen={deleteModal} closeModal={() => setDeleteModal(false)} title="Confirmar exclusão">
            <p>Tem certeza que deseja excluir o perfil de <strong>{name}</strong>? Esta ação não pode ser desfeita.</p>
            <div className="flex gap-3 mt-4 sm:gap-4">
              <RoundButton color="brown" text="Cancelar" onClick={() => setDeleteModal(false)} />
              <RoundButton
                color="red"
                text={loading ? "Excluindo..." : "Excluir"}
                onClick={handleDelete}
              />
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default MyPet
