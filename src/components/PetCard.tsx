import type { PetCardProps } from "@/types/types"
import { Link } from "react-router"
import { IoPaw } from "react-icons/io5"
import { FaLocationDot } from "react-icons/fa6"
import { getAge } from "@/utils/helpers"

function PetCard({ id, name, dob, gender, city, photo }:PetCardProps ) {
  const petAge = getAge(dob)

  return (
    <Link to={`/pet/${id}`} className="w-fit">
      <div className="flex flex-col gap-3 bg-white max-w-[250px] p-5 rounded-t-[15px] rounded-b-[20px] hover:shadow-lg transition-all duration-300">
        <div className="rounded-t-[10px] rounded-b-[15px] overflow-clip h-[230px]">
          <img 
          src={photo} 
          alt={`Foto de ${name}`} 
          className="w-full h-full object-cover" 
          />
        </div>

        <h2 className="font-semibold text-[28px] mt-1">
          {name}, {petAge >= 1 ? petAge : petAge * 10}
        </h2>
        
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <IoPaw className="text-lg text-brown" /> {gender}
          </span>
          <span className="flex items-center gap-2">
            <FaLocationDot className="text-lg text-blue" /> {city}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default PetCard
