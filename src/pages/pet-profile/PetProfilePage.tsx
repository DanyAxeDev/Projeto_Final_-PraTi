import { useNavigate, useParams } from "react-router"
import RoundButton from "@/components/RoundButton"
import FavoriteButton from "@/components/FavoriteButton"
import GalleryCard from "./components/GalleryCard"
import { IoIosArrowBack } from "react-icons/io"
import { IoPaw } from "react-icons/io5"
import { FaMapLocationDot } from "react-icons/fa6"

export type Pet = {
  name: string;
  species: string;
  gender: string;
  age: string;
  size: string;
  neighbourhood: string;
  city: string;
  personality: string[];
  health: string;
  about: string;
  photos: string[];
}

const pet: Pet = {
  name: "Tico",
  species: "Cachorro",
  gender: "Macho",
  age: "3 anos",
  size: "Médio",
  neighbourhood: "Copacabana",
  city: "Rio de Janeiro",
  personality: ["Se dá bem com outros pets", "Se dá bem com crianças", "Brincalhão"],
  health: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes.",
  about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis eget efficitur velit. Nam eget faucibus quam. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc interdum risus et ultrices gravida. Pellentesque sollicitudin ipsum id mi consequat, at laoreet dui tincidunt. Vestibulum sagittis commodo dictum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; In nec massa rutrum, laoreet nisi et, sodales felis.",
  photos: [
    "https://placedog.net/360/380",
    "https://placedog.net/360/390",
    "https://placedog.net/360/370",
  ]
};

export default function PetProfilePage() {
  const { id } = useParams() // Pega o id do pet pela url para carregar as informações dele
  const navigate = useNavigate()

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
                <span className="font-semibold mr-2">Espécie:</span> {pet.species}
              </p>
              <p className="mb-1">
                <span className="font-semibold mr-8.5">Sexo:</span> {pet.gender}
              </p>
              <p className="mb-1">
                <span className="font-semibold mr-7">Idade:</span> {pet.age}
              </p>
              <p>
                <span className="font-semibold mr-7.5">Porte:</span> {pet.size}
              </p>
            </section>

            <section>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Personalidade</h2>
              <div className="lg:columns-2">
                {pet.personality.map(trait => {
                  return (
                    <p className="flex items-center gap-2">
                      <IoPaw className="text-blue text-lg" aria-hidden="true" /> {trait}
                    </p>
                  )
                })}
              </div>
            </section>

            <section>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Saúde</h2>
              <p>{pet.health}</p>
            </section>
          </section>
          
          {/* Card */}
          <GalleryCard photos={pet.photos} petName={pet.name} />
        </section>
        
        {/* Parte de baixo */}
        <section className="flex flex-col justify-between items-start gap-10 md:flex-row">
          {/* Sobre */}
          <section className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="font-semibold text-[28px] text-brown mb-3">Sobre o pet</h2>
              <p>{pet.about}</p>
            </div>
            <div className="flex items-between gap-4 mx-auto md:mx-0">
              <RoundButton text="Enviar mensagem" color="blue" onClick={() => ""} />
              <FavoriteButton isFavorite={false} />
            </div>
          </section>

          {/* Distância */}
          <section className="flex flex-col justify-between gap-5 mx-auto rounded-sm bg-white p-5 w-full max-w-full sm:flex-row md:max-w-[490px]">
            <section className="flex flex-col gap-3">
              <FaMapLocationDot className="text-blue text-4xl" aria-hidden="true" />
              <h3 className="text-2xl font-semibold text-brown">
                A <span className="text-blue">10km</span> de você
              </h3>
              <p>Em {pet.neighbourhood}, {pet.city}</p>
            </section>
            {/* Mapa */}
            <section className="w-full h-[230px] rounded-sm bg-lightgray sm:w-full md:size-[230px] lg:size-[300px]">
            </section>
          </section>
        </section>
      </article>
    </section>
  )
}