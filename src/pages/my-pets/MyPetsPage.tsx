import { useState } from "react"
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import MyPet from "./components/MyPet"
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa"
import testPets from "@/data/pets"
import type { Pet, Order } from "@/types/types"

function MyPetsPage() {
  const [order, setOrder] = useState<Order>("normal")
  const [pets, setPets] = useState<Pet[]>(testPets)

  const ascendingPets = [...testPets].sort((a: Pet, b: Pet) => a.name.localeCompare(b.name))
  const descendingPets = [...testPets].sort((a: Pet, b: Pet) => b.name.localeCompare(a.name))

  // Troca a ordem que o usuário deseja ver os pets, baseado nos nomes
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
    <PageWithHeaderLayout title="Meus pets">
      <section className="max-w-[1100px] mx-auto flex flex-col justify-between gap-10 h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        <section className="self-end">
          <button
          onClick={changeOrder}
          aria-label={order === "ascending" ? "Ordenar por ordem alfabética inversa" : "Ordenar por ordem alfabética"}
          title={order === "ascending" ? "Ordenar por ordem alfabética inversa" : "Ordenar por ordem alfabética"}
          className="text-2xl text-brown cursor-pointer hover:text-darkblue transition-colors duration-300 p-1"
          >
            {order === "ascending" ? <FaSortAlphaUp aria-hidden="true" /> : <FaSortAlphaDown aria-hidden="true" />}
          </button>
        </section>

        <section className="flex flex-col items-center gap-10 sm:items-start sm:gap-8">
          {pets.map(pet => {
            return <MyPet 
            key={pet.id}
            name={pet.name}
            id={pet.id}
            photo={pet.photos[0]}
            />
          })}
        </section>
      </section>
    </PageWithHeaderLayout>
  )
}

export default MyPetsPage
