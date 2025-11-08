import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import RoundButton from "@/components/RoundButton"
import FavoriteButton from "@/components/FavoriteButton"
import GalleryCard from "./components/GalleryCard"
import { IoIosArrowBack } from "react-icons/io"
import { IoPaw } from "react-icons/io5"
import type { Pet } from "@/types/api"
import { petService } from "@/services/petService"
import { getAge } from "@/utils/helpers"
import Loader from "@/components/Loader"
import { useFavorites } from "@/hooks/useFavorites"
import PinMap from "@/components/PinMap"

export default function PetProfilePage() {
  const [pet, setPet] = useState<Pet | undefined>(undefined)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite } = useFavorites()

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) {
        setError('ID do pet não fornecido')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)

        const result = await petService.getPetById(Number(id))

        if (result.success && result.data) {
          setPet(result.data)
        } else {
          setError(result.error || 'Pet não encontrado')
        }
      } catch (err) {
        console.error('Erro ao buscar pet:', err)
        setError('Erro inesperado ao buscar pet')
      } finally {
        setLoading(false)
      }
    }

    fetchPet()
  }, [id])

  if (loading) {
    return (
      <section className="flex justify-center items-center h-64">
        <Loader />
      </section>
    )
  }

  if (error || !pet) {
    return (
      <section className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500 text-center">{error || 'Pet não encontrado'}</p>
        <RoundButton text="Voltar" color="blue" onClick={() => navigate(-1)} />
      </section>
    )
  }

  const petAge = getAge(pet.birthDate)
  return (
    <section className="max-w-[1100px] mx-auto py-15 px-4 font-raleway font-medium sm:p-8">
      <button
        onClick={() => navigate(-1)}
        aria-label="Voltar para a página anterior"
        className="flex items-center gap-2 p-1 font-semibold mb-8 cursor-pointer hover:underline underline-offset-2"
      >
        <IoIosArrowBack className="size-4" aria-hidden="true" /> Voltar
      </button>

      <article className="flex flex-col gap-10">
        {/* Parte de cima */}
        <section className="flex flex-col-reverse items-start justify-between gap-10 sm:flex-row">
          {/* Info */}
          <section className="flex flex-col gap-12 w-full sm:w-2/4">
            <section className="text-lg">
              <h1 className="font-tilt text-brown text-5xl mb-4">{pet.name}</h1>
              <p className="mb-1">
                <span className="font-semibold mr-8.5">Sexo:</span> {pet.gender === "male" ? "Macho" : "Fêmea"}
              </p>
              <p className="mb-1">
                <span className="font-semibold mr-7">Idade:</span> {petAge >= 1 ? `${petAge} anos` : `${petAge * 10} meses`}
              </p>
              <p>
                <span className="font-semibold mr-7.5">Porte:</span> {pet.size === "small" ? "Pequeno" : pet.size === "medium" ? "Médio" : "Grande"}
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Personalidade</h2>
              <div className="lg:columns-2">
                {pet.active && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Ativo
                  </p>
                )}
                {pet.goodWithPets && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Se dá bem com outros pets
                  </p>
                )}
                {pet.calm && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Calmo
                  </p>
                )}
                {pet.goodWithKids && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Se dá bem com crianças
                  </p>
                )}
                {pet.extrovert && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Extrovertido
                  </p>
                )}
                {pet.introvert && (
                  <p className="flex items-center gap-2">
                    <IoPaw className="text-blue text-lg" aria-hidden="true" /> Introvertido
                  </p>
                )}
                {!pet.active && !pet.goodWithPets && !pet.calm && !pet.goodWithKids && !pet.extrovert && !pet.introvert && (
                  <p className="text-gray-500">Personalidade não informada</p>
                )}
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Saúde</h2>
              <p>{pet.health}</p>
            </section>
          </section>

          {/* Card */}
          <GalleryCard photos={[pet.photo1, pet.photo2, pet.photo3].filter((photo): photo is string => Boolean(photo))} petName={pet.name} />
        </section>

        {/* Parte de baixo */}
        <section className="flex flex-col justify-between items-start gap-10 md:flex-row">
          {/* Sobre */}
          <section className="flex flex-col justify-between gap-8 md:max-w-[450px]">
            <div>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Sobre o pet</h2>
              <p>{pet.about}</p>
            </div>
            <div className="flex items-between gap-4 mx-auto md:mx-0">
              <RoundButton text="Enviar mensagem" color="blue" onClick={() => navigate(`/pet/${pet.id}/adotar`)} />
              <FavoriteButton petId={pet.id} isFavorite={isFavorite(pet.id)} />
            </div>
          </section>

          {/* Distância */}
          <section className="flex flex-col justify-between gap-5 mx-auto rounded-sm bg-white p-5 w-full max-w-full sm:flex-row md:mx-0 lg:max-w-[500px]">
            {/* Mapa */}
            <PinMap latitude={pet.latitude} longitude={pet.longitude} />
          </section>
        </section>
      </article>
    </section>
  )
}