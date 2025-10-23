import { useState, useMemo } from "react"
import { useNavigate } from "react-router"
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import MyPet from "./components/MyPet"
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa"
import { useMyPets } from "@/hooks/useMyPets"
import type { Order } from "@/types/types"
import Loader from "@/components/Loader"

function MyPetsPage() {
  const [order, setOrder] = useState<Order>("normal")
  const { pets, loading, error, refetch } = useMyPets()
  const navigate = useNavigate()

  // Ordenação dos pets baseada no estado atual
  const sortedPets = useMemo(() => {
    if (order === "ascending") {
      return [...pets].sort((a, b) => a.name.localeCompare(b.name))
    } else if (order === "descending") {
      return [...pets].sort((a, b) => b.name.localeCompare(a.name))
    }
    return pets
  }, [pets, order])

  // Troca a ordem que o usuário deseja ver os pets, baseado nos nomes
  const changeOrder = () => {
    if (order === "ascending") {
      setOrder("descending")
    } else {
      setOrder("ascending")
    }
  }

  // Se estiver carregando, mostra o loader
  if (loading) {
    return (
      <PageWithHeaderLayout title="Meus pets">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </PageWithHeaderLayout>
    )
  }

  // Se houver erro, mostra mensagem de erro
  if (error) {
    return (
      <PageWithHeaderLayout title="Meus pets">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-red-500 text-center">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue text-white rounded hover:bg-darkblue transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </PageWithHeaderLayout>
    )
  }

  // Se não houver pets, mostra mensagem
  if (pets.length === 0) {
    return (
      <PageWithHeaderLayout title="Meus pets">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-gray-600 text-center">Você ainda não cadastrou nenhum pet.</p>
          <button
            onClick={() => navigate('/cadastro-de-pet')}
            className="px-4 py-2 bg-blue text-white rounded hover:bg-darkblue transition-colors"
          >
            Cadastrar primeiro pet
          </button>
        </div>
      </PageWithHeaderLayout>
    )
  }

  return (
    <PageWithHeaderLayout title="Meus pets">
      <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-10 h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        <section className="self-end">
          <button
            onClick={changeOrder}
            aria-label={order === "ascending" ? "Ordenar por ordem alfabética inversa" : "Ordenar por ordem alfabética"}
            title={order === "ascending" ? "Ordenar por ordem alfabética inversa" : "Ordenar por ordem alfabética"}
            className="text-2xl text-brown cursor-pointer hover:text-darkblue focus:text-darkblue transition-colors duration-300 p-1"
          >
            {order === "ascending" ? <FaSortAlphaUp aria-hidden="true" /> : <FaSortAlphaDown aria-hidden="true" />}
          </button>
        </section>

        <section className="flex flex-col items-center gap-10 sm:items-start sm:gap-8">
          {sortedPets.map(pet => {
            return <MyPet
              key={pet.id}
              name={pet.name}
              id={pet.id}
              photo={pet.photo1 || pet.photo2 || pet.photo3 || ''}
              available={pet.available}
              onPetDeleted={refetch}
            />
          })}
        </section>
      </section>
    </PageWithHeaderLayout>
  )
}

export default MyPetsPage
