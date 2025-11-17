import { useState } from "react"
import RoundButton from "../../components/RoundButton"
import Card from "./components/Card"
import HeadingWithLine from "@/components/HeadingWithLine"
import { useNavigate } from "react-router"
import stories from "@/data/stories"
import type { Story } from "@/types/types"

function HistoryPage() {
    const [historias] = useState<Story[]>(stories)

    const navigate = useNavigate()
    /* const loadMoreRef = useRef<HTMLDivElement | null>(null)

    const carregarMais = () => {
        const novos = Array.from({ length: 4 }, () => {
            const randomIndex = Math.floor(Math.random() * baseHistorias.length)
            const historia = baseHistorias[randomIndex]

            return {
                ...historia,
                title: `${historia.title} (nova ${(Math.random() * 100).toFixed(0)})`,
                image: `https://placekitten.com/${200 + Math.floor(Math.random() * 50)}/${200 + Math.floor(Math.random() * 50)}`
            }
        })

        setHistorias(prev => [...prev, ...novos])
    }


    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                carregarMais()
            }
        }, { threshold: 1 })

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current)
        }

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current)
            }
        }
    }, []) */


    return (
        <section className="max-w-[1100px] mx-auto flex flex-col justify-between items-center gap-8 h-full py-12 px-4 font-raleway sm:px-8">
            <div className="flex flex-col gap-8 items-center mb-6 text-center">
                <HeadingWithLine text="Histórias de adoção" />
                <p className="text-xl font-semibold max-w-[900px]">
                    Veja depoimentos de pessoas que já praticaram a adoção e como isso afetou positivamente as suas vidas.
                </p>
                <RoundButton 
                text="Compartilhar minha história" 
                color="blue" 
                onClick={() => navigate("/compartilhar-historia")} 
                />
            </div>

            <section className="columns-1 gap-8 mt-8 sm:columns-2 md:gap-10">
                {historias.map((historia, index) => (
                    <Card
                        key={index}
                        image={historia.image}
                        human={historia.human}
                        pet={historia.pet}
                        description={historia.description}
                    />
                ))}
            </section>

            {/* <div ref={loadMoreRef} className="h-10"></div> */}
        </section>
    )
}

export default HistoryPage
