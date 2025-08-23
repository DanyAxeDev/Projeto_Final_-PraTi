import { useEffect, useRef, useState } from "react"
import RoundButton from "../../components/RoundButton"
import Card from "./components/Card"

type Historia = {
    image: string
    title: string
    description: string
}

// modificar o conteudo do (image, title e description)
function HistoryPage() {
    const baseHistorias: Historia[] = [
        {
            image: "https://placekitten.com/200/200",
            title: "Maria & Pipoca",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl tellus..."
        },
        {
            image: "https://placekitten.com/201/200",
            title: "Felipe & Mario",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl tellus..."
        },
        {
            image: "https://placekitten.com/202/200",
            title: "Humano & Pet",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl tellus..."
        },
        {
            image: "https://placekitten.com/203/200",
            title: "João & Rex",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisl tellus..."
        }
    ]

    const [historias, setHistorias] = useState<Historia[]>(baseHistorias)
    const loadMoreRef = useRef<HTMLDivElement | null>(null)

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
    }, [])

    return (
        <section className="p-6 bg-gray-100">
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold text-gray-800">Histórias de adoção</h1>
                <hr className="my-2 border-gray-300" />
                <p className="text-gray-600">
                    Textinho sobre as adoções e o compatilhamento de histórias
                </p>
                <RoundButton text="Compartilhar minha história" />
            </div>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {historias.map((historia, index) => (
                    <Card
                        key={index}
                        image={historia.image}
                        title={historia.title}
                        description={historia.description}
                    />
                ))}
            </section>

            <div ref={loadMoreRef} className="h-10"></div>
        </section>
    )
}

export default HistoryPage

