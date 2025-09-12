import { useState } from "react"
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import PetCard from "../../components/PetCard"
import testPets from "@/data/pets"
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa"
import type { Pet } from "@/types/types"
import { getAge } from "@/utils/helpers"

type Order =  "normal" | "ascending" | "descending"

function Home() {
  const [order, setOrder] = useState<Order>("normal")
  const [pets, setPets] = useState<Pet[]>(testPets)

  const ascendingPets = [...testPets].sort((a: Pet, b: Pet) => getAge(a.dob) - getAge(b.dob))
  const descendingPets = [...testPets].sort((a: Pet, b: Pet) => getAge(b.dob) - getAge(a.dob))

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
          className="text-2xl text-brown cursor-pointer hover:text-darkblue transition-colors duration-300 p-1" 
          >
            {order === "ascending" ? <FaSortAmountDown aria-hidden="true" /> : <FaSortAmountUp aria-hidden="true" />}
          </button>
        </section>
        <section className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3">
          {pets.map(pet => {
            return <PetCard 
            key={pet.id} 
            id={pet.id}
            name={pet.name}
            dob={pet.dob}
            gender={pet.gender}
            city={pet.city}
            photo={pet.photos[0]}
            />
          })}
        </section>
      </section>
    </PageWithHeaderLayout>
  )
}

export default Home
