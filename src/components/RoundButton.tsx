type RoundButtonProps = {
  text: string,
  color: string,
  onClick: () => void
}

function RoundButton({ text, color, onClick }: RoundButtonProps) {
  return (
    <button onClick={onClick} className={`${color === "blue" ? "bg-blue hover:bg-darkblue" : "bg-brown hover:bg-darkbrown"} text-white font-bold py-2 px-8 rounded-full transition-colors duration-300 cursor-pointer`}>
      {text}
    </button>
  )
}

export default RoundButton
