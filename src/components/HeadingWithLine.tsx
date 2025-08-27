type HeadingWithLineProps = {
  text: string,
  color?: string
}

// Passar a cor "sand" se o texto for bege; o default é a cor marrom
function HeadingWithLine({ text, color = "brown" }: HeadingWithLineProps) {
  return (
    <div className="flex flex-col items-center gap-3 w-fit mx-auto">
      <h1 className={`font-tilt ${color === "brown" ? "text-brown" : "text-sand"} text-3xl md:text-4xl`}>
        {text}
      </h1>
      <hr className={`border-b-2 ${color === "brown" ? "border-b-brown" : "border-b-sand"} w-[85%]`} />
    </div>
  )
}

export default HeadingWithLine
