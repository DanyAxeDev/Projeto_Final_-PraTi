import { useState, useEffect } from "react"
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout"
import PetCard from "@/components/PetCard"
import FavoriteButton from "@/components/FavoriteButton"
import { petService } from "@/services/petService"
import { useUser } from "@/hooks/useUser"
import { useFavorites } from "@/hooks/useFavorites"
import Loader from "@/components/Loader"
import type { Pet } from "@/types/api"

function FavoritesPage() {
  const [pets, setPets] = useState<Pet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useUser()
  const { isFavorite } = useFavorites()

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user) {
        setError('Usuário não logado')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const result = await petService.getUserFavorites(user.id)

        if (result.success && result.data) {
          setPets(result.data)
        } else {
          setError(result.error || 'Erro ao buscar favoritos')
        }
      } catch (err) {
        console.error('Erro ao buscar favoritos:', err)
        setError('Erro inesperado ao buscar favoritos')
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user])

  if (loading) {
    return (
      <PageWithHeaderLayout title="Favoritos">
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </PageWithHeaderLayout>
    )
  }

  if (error) {
    return (
      <PageWithHeaderLayout title="Favoritos">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-red-500 text-center font-raleway font-medium">{error}</p>
        </div>
      </PageWithHeaderLayout>
    )
  }

  if (pets.length === 0) {
    return (
      <PageWithHeaderLayout title="Favoritos">
        <div className="flex flex-col items-center justify-center h-64 gap-4">
          <p className="text-gray-600 text-center font-raleway font-medium">Você ainda não tem pets favoritos.</p>
        </div>
      </PageWithHeaderLayout>
    )
  }

  return (
    <PageWithHeaderLayout title="Favoritos">
      <section className="grid grid-cols-1 place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 max-w-[1100px] mx-auto h-full pt-15 pb-20 px-4 font-raleway font-medium mt-4 sm:py-20 sm:px-8">
        {pets.map(pet => {
          return (
            <div className="w-fit relative" key={`pet-${pet.id}`}>
              <PetCard
                key={pet.id}
                id={pet.id}
                name={pet.name}
                dob={pet.birthDate}
                gender={pet.gender}
                city={pet.city}
                photo={pet.photo1 || pet.photo2 || pet.photo3 || ''}
              />

              <div className="w-fit absolute right-0 bottom-[-12px]">
                <FavoriteButton key={`button-${pet.id}`} petId={pet.id} isFavorite={isFavorite(pet.id)} />
              </div>
            </div>
          )
        })}
      </section>
    </PageWithHeaderLayout>
  )
}

export default FavoritesPage
