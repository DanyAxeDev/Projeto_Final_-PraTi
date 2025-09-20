type ValueCardProps = {
    img: string;
    title: string;
    text: string;
  }
  
  function ValueCard({ img, title, text }: ValueCardProps) {
    return (
      <article className="flex flex-col items-center gap-4 bg-white p-5 rounded-[5px] w-full max-w-[300px] h-full max-h-[280px] shadow-xs">
        <img src={img} alt={`ícone de ${title}`} className="size-15 mb-1" />
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-center">{text}</p>
      </article>
    )
  }
  
  export default ValueCard