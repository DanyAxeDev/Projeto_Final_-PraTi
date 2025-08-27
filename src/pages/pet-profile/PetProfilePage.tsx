import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { FaHeart, FaComment } from "react-icons/fa";
import { useState } from "react";

export type Pet = {
  name: string;
  species: string;
  gender: string;
  age: string;
  size: string;
  location: string;
  isGoodWithPets: boolean;
  isGoodWithKids: boolean;
  about: string;
  mainImageUrl: string;
  thumbnailUrls: string[];
};

const DetailItem = ({ children }: { children: React.ReactNode }) => (
  <li>{children}</li>
);
const TagItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-2">
    <div className="size-3 rounded-full bg-gray-300"></div>
    <p>{children}</p>
  </div>
);

export default function PetProfilePage({ pet }: { pet: Pet }) {
  const [selectedImage, setSelectedImage] = useState(pet.mainImageUrl);

  return (
    <div className="p-8 max-w-6xl mx-auto">

      <Link to="/" className="flex items-center gap-2 font-semibold mb-6">
        <IoIosArrowBack className="size-4" />
        Voltar
      </Link>

      {/* Grid principal */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Coluna da Esquerda */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
            <img
              src={selectedImage}
              alt={`Foto de ${pet.name}`}
              className="w-full h-80 object-cover rounded-lg"
            />

            {/* Thumbnails (Miniaturas) */}
            <div className="grid grid-cols-3 gap-4">
              {pet.thumbnailUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(url)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg overflow-hidden"
                >
                  <img
                    src={url}
                    alt={`Miniatura ${index + 1} de ${pet.name}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Botões de Ação */}
            <div className="flex items-center justify-center gap-4 mt-4">
              <Button size="icon" variant="outline" className="rounded-full size-12">
                <FaComment className="size-6" />
              </Button>
              <Button size="icon" variant="outline" className="rounded-full size-12">
                <FaHeart className="size-6" />
              </Button>
            </div>
          </div>
        </div>

        {/* Coluna da Direita */}
        <div className="flex flex-col gap-12">

          {/* Detalhes do Pet */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-4 rounded-full bg-gray-300"></div>
              <h1 className="text-4xl font-bold">{pet.name}</h1>
            </div>
            <ul className="space-y-2 mb-6">
              <DetailItem>{pet.species}</DetailItem>
              <DetailItem>{pet.gender}</DetailItem>
              <DetailItem>{pet.age}</DetailItem>
              <DetailItem>{pet.size}</DetailItem>
              <DetailItem>{pet.location}</DetailItem>
            </ul>
            <div className="space-y-3">
              {/*Só mostra se a condição for verdadeira */}
              {pet.isGoodWithPets && <TagItem>Se dá bem com outros pets</TagItem>}
              {pet.isGoodWithKids && <TagItem>Se dá bem com crianças</TagItem>}
            </div>
          </section>

          {/* Sobre o Pet */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Sobre o pet</h2>
            <p className="leading-relaxed">{pet.about}</p>
          </section>

          {/* Distância e Mapa */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Distância entre você e {pet.name}</h2>
            <div className="w-full h-72 bg-gray-300 rounded-lg flex items-center justify-center">
              <p>Placeholder para o mapa</p>
            </div>
          </section>
        </div>

      </main>
    </div>
  );
}