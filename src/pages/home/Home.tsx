import { useState, useEffect, useContext } from "react"
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import PetCard from "../../components/PetCard"
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import type { Order } from "@/types/types"
import type { Pet } from "@/types/api"
import { petService } from "@/services/petService"
import { getAge } from "@/utils/helpers"
import { toast } from "sonner"
import { UserContext } from "@/context/userContext"

function Home() {
  const [order, setOrder] = useState<Order>("normal")
  const [pets, setPets] = useState<Pet[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userContext = useContext(UserContext)

  // Carregar pets disponíveis
  useEffect(() => {
    const loadPets = async () => {
      try {
        setIsLoading(true)
        // Passar o userId se o usuário estiver logado
        const userId = userContext?.user?.id
        const result = await petService.getAvailablePetsList(userId)

        if (result.success && result.data) {
          setPets(result.data)
        } else {
          toast.error(result.error || "Erro ao carregar pets")
        }
      } catch (error) {
        toast.error("Erro inesperado ao carregar pets")
        console.error("Error loading pets:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPets()
  }, [userContext?.user?.id])

  const ascendingPets = [...pets].sort((a: Pet, b: Pet) => getAge(a.birthDate) - getAge(b.birthDate))
  const descendingPets = [...pets].sort((a: Pet, b: Pet) => getAge(b.birthDate) - getAge(a.birthDate))

  // Troca a ordem que o usuário deseja ver os pets, baseado nas idades
  const changeOrder = () => {
    if (order === "ascending") {
      setOrder("descending")
      setPets(descendingPets)
    } else {
      setOrder("ascending")
      setPets(ascendingPets)
    }
  }

  return (
    <PageWithHeaderLayout title="Pets na sua região">
      <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-10 h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        <section className="self-end">
          <button
            onClick={changeOrder}
            aria-label={order === "ascending" ? "Ordenar por maior idade" : "Ordenar por menor idade"}
            title={order === "ascending" ? "Ordenar por maior idade" : "Ordenar por menor idade"}
            className="text-2xl text-brown cursor-pointer hover:text-darkblue focus:text-darkblue transition-colors duration-300 p-1"
          >
            {order === "ascending" ? <FaSortAmountDown aria-hidden="true" /> : <FaSortAmountUp aria-hidden="true" />}
          </button>
        </section>
        <section className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <p className="text-brown">Carregando pets...</p>
            </div>
          ) : pets.length === 0 ? (
            <div className="col-span-full text-center py-8">
              <p className="text-brown">Nenhum pet disponível no momento.</p>
            </div>
          ) : (
            pets.map(pet => {
              return <PetCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                dob={pet.birthDate}
                gender={pet.gender}
                city={pet.city}
                photo={pet.photo1 || ''}
              />
            })
          )}
        </section>
      </section>
    </PageWithHeaderLayout>
  )
}

export default Home
