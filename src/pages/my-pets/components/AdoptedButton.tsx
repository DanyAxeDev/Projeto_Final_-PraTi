import confetti from "canvas-confetti"

type AdoptedProps = {
  openModal: () => void;
}

function AdoptedButton({ openModal }: AdoptedProps) {
  /* Função de animação de confete */
  const shootCannons = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#F0AD29", "#fd8bbc", "#EF9C20", "#18C2EA", "#AEEA53"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  /* Função de chamar animação e abrir modal */
  const handleClick = () => {
    shootCannons()
    openModal()
  }

  return (
    <button 
    onClick={handleClick}
    className="font-bold text-brown rounded-full border-3 border-brown py-1 px-3 cursor-pointer transition-colors duration-300 hover:text-darkbrown hover:border-transparent focus:text-darkbrown focus:border-darkbrown sm:px-5"
    >
      Marcar como adotado
    </button>
  )
}

export default AdoptedButton
