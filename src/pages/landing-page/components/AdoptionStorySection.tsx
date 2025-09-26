import { Link } from "react-router"
import { FaArrowRight } from "react-icons/fa"
import stories from "@/data/stories"

function AdoptionStorySection() {
  return (
    <section className="flex gap-4 items-center ">
      <div className="bg-gray-300 rounded-full size-15 min-w-15 overflow-clip">
        <img 
        src={stories[0].image} 
        alt={`Foto de ${stories[0].human} e ${stories[0].pet}`} 
        className="w-full h-full object-cover" 
        />
      </div>
      
      <div className="text-sm">
        <p className="max-w-[270px] break-words mb-1 font-medium">
          {stories[0].human}, {stories[1].human} e outras {stories.length - 2} pessoas já conectaram os fios com seus pets.
        </p>
        <Link 
        to="/historias-de-adocao" 
        className="font-semibold text-brown flex items-center gap-2 hover:underline underline-offset-4"
        >
          Ver histórias de adoção <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export default AdoptionStorySection
