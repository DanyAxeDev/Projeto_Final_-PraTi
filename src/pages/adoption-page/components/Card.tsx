type CardProps = {
  image: string
  title: string
  description: string
}

export default function Card({ image, title, description }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-4 transition-transform transform hover:scale-105">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}
