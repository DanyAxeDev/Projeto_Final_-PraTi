type RoundButtonProps = {
  text: string,
  color: string,
  onClick: () => void,
  disabled?: boolean
}

function RoundButton({ text, color, onClick, disabled = false }: RoundButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${color === "blue" ? "bg-blue hover:bg-darkblue focus:bg-darkblue" : "bg-brown hover:bg-darkbrown focus:bg-darkbrown"} text-white font-bold py-2 px-8 rounded-full transition-colors duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  )
}

export default RoundButton
