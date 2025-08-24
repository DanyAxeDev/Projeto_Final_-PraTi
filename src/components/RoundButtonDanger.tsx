type RoundButtonDangerProps = {
	text: string
}

function RoundButtonDanger({ text }: RoundButtonDangerProps) {
	return (
		<button 
		className="bg-red-400 py-1 px-8 rounded-full transition-colors duration-300 hover:bg-darkred text-white font-raleway font-bold w-full cursor-pointer"
		>
    		{text}
		</button>
  )
}

export default RoundButtonDanger
