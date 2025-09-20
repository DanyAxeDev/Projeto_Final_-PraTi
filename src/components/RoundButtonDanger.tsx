type RoundButtonDangerProps = {
	text: string
	onClick: () => void
}

function RoundButtonDanger({ text, onClick }: RoundButtonDangerProps) {
	return (
		<button 
		onClick={onClick}
		className="bg-red-400 py-1 px-8 rounded-full transition-colors duration-300 hover:bg-darkred text-white font-raleway font-bold w-full cursor-pointer"
		>
    		{text}
		</button>
  )
}

export default RoundButtonDanger
