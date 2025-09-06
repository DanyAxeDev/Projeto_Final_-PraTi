import { useState } from "react"

type GalleryCardProps = {
  photos: string[]
  petName: string
}

function GalleryCard({ photos, petName }: GalleryCardProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0) // Imagem atual do card

  return (
    <section className="flex flex-col gap-5 items-center bg-white w-full max-w-full  p-5 rounded-t-[15px] rounded-b-[20px] mx-auto sm:max-w-[320px] sm:mx-0 md:max-w-[400px]">
      {/* Imagem grande */}
      <div className="w-full h-3/4 overflow-clip rounded-t-[10px] rounded-b-[15px] sm:h-[280px] md:h-[380px]">
        <img 
        src={photos[currentPhoto]} 
        alt={`Foto de ${petName}`} 
        className="w-full h-full object-cover" 
        />
      </div>
      
      {/* Imagens pequenas */}
      <section className="flex gap-5">
        {photos.map((photo, i) => {
          return (
          <div 
          onClick={() => setCurrentPhoto(i)} 
          className={`size-[60px] rounded-sm overflow-clip ${currentPhoto === i ? "" : "cursor-pointer"} md:size-[90px]`}
          >
            <img 
            src={photo} 
            alt={`Foto ${i+1} de ${petName}`} 
            className="w-full h-full object-cover" 
            />
          </div>
        )
        })}
      </section>
    </section>
  )
}

export default GalleryCard
