import { useEffect, useRef, useState } from "react"
import RoundButton from "../../components/RoundButton"
import Card from "./components/Card"
import HeadingWithLine from "@/components/HeadingWithLine"
import { Link } from "react-router";

type Historia = {
    image: string
    human: string
    pet: string
    description: string
}


// modificar o conteudo do (image, title e description)
function HistoryPage() {
    
    const baseHistorias: Historia[] = [
        {
            image: "https://placekitten.com/200/200",
            human: "Maria",
            pet: "Pipoca",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi tellus, interdum et tortor at, porta feugiat felis. Mauris placerat convallis elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },
        {
            image: "https://placekitten.com/202/200",
            human: "Sara",
            pet: "Lulu",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi tellus, interdum et tortor at, porta feugiat felis. Mauris placerat convallis elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },
        {
            image: "https://placekitten.com/201/200",
            human: "Felipe",
            pet: "Mario",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi tellus, interdum et tortor at, porta feugiat felis. Mauris placerat convallis elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi tellus, interdum et tortor at, porta feugiat felis. Mauris placerat convallis elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        },
        {
            image: "https://placekitten.com/203/200",
            human: "João",
            pet: "Rex",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nisi tellus, interdum et tortor at, porta feugiat felis. Mauris placerat convallis elementum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus."
        }
    ]

    const [historias, setHistorias] = useState<Historia[]>(baseHistorias)
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
                <p className="text-xl font-semibold">
                    Textinho sobre as adoções e o compartilhamento de histórias
                </p>
                <Link to="/share-stories">
                    <RoundButton text="Compartilhar minha história" color="blue" />
                </Link>
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
