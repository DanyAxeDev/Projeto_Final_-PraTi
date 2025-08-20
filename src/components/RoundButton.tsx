type RoundButtonProps = {
  text: string
}

function RoundButton({ text }: RoundButtonProps) {
  return (
    <button className="bg-gray-300 py-2 px-8 rounded-full transition-all duration-300 hover:brightness-85">
      {text}
    </button>
  )
}

export default RoundButton
