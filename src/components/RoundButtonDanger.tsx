type RoundButtonDangerProps = {
	text: string
	onClick: () => void
}

function RoundButtonDanger({ text, onClick }: RoundButtonDangerProps) {
	return (
		<button 
		type="button"
		onClick={onClick}
		className="bg-red-400 py-1 px-8 rounded-full transition-colors duration-300 hover:bg-darkred focus:bg-darkred text-white font-raleway font-bold w-full cursor-pointer"
		>
    		{text}
		</button>
  )
}

export default RoundButtonDanger
