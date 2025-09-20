type CardProps = {
  image: string
  human: string
  pet: string
  description: string
}

export default function Card({ image, human, pet, description }: CardProps) {
  return (
    <article className="flex flex-col items-center gap-4 w-full max-w-[360px] bg-white shadow-sm rounded-lg overflow-hidden p-5 mb-8 md:mb-10">
      <div className="size-[120px] bg-lightgray rounded-full">
        <img
          src={image}
          alt={`Imagem de ${human} e ${pet}`}
          className="w-full object-cover"
        />
      </div>
      
      <h2 className="text-2xl font-semibold">
        {human} <span className="text-blue font-bold">&</span> {pet}
      </h2>
      <p className="font-medium">
        {description}
      </p>
    </article>
  )
}
