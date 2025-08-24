import { Link } from "react-router"
import { FaArrowRight } from "react-icons/fa"

function AdoptionStorySection() {
  return (
    <section className="flex gap-4 items-center">
      <div className="bg-gray-300 rounded-full size-15">
        <img src="#" alt="" />
      </div>
      
      <div className="text-sm">
        <p className="max-w-[270px] mb-1 font-medium">
          Maria, Felipe e outras 60 pessoas já conectaram os fios com seus pets.
        </p>
        <Link 
        to="#" 
        className="font-semibold text-brown flex items-center gap-2 hover:underline"
        >
          Ver histórias de adoção <FaArrowRight />
        </Link>
      </div>
    </section>
  )
}

export default AdoptionStorySection
