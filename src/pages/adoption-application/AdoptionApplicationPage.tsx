import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import RoundButton from "@/components/RoundButton";
import { Label } from "@/components/ui/label";
import { IoIosArrowBack } from "react-icons/io";
import IconBox from "@/assets/icons/pets-box.png";
import { toast } from "sonner";

import type { Pet } from "@/types/types";
import pets from "@/data/pets";

export default function AdoptionApplicationPage() {
    const { id: petId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    // Estados para guardar os dados do pet e controlar o loading
    const [pet, setPet] = useState<Pet | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [contactMethod, setContactMethod] = useState("whatsapp");

    useEffect(() => {
        if (petId) {
            // Simulação de fetch, como na PetProfilePage
            const foundPet = pets.find(p => p.id == Number(petId));
            setPet(foundPet);
        }
        setLoading(false);
    }, [petId]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const applicationData = { petId, message, contactMethod };
        console.log("Enviando candidatura:", applicationData);

        toast.success("Candidatura enviada com sucesso!");

        setTimeout(() => {
            navigate(`/pet/${petId}`);
        }, 2000);
    };

    if (loading) {
        return (
            <section className="flex-1 flex justify-center items-center">
                <p>Carregando informações do pet...</p>
            </section>
        );
    }

    if (!pet) {
        return (
            <section className="flex-1 flex flex-col justify-center items-center gap-4">
                <p className="text-xl">Ops! Pet não encontrado.</p>
                <RoundButton text="Voltar" color="blue" onClick={() => navigate('/home')} />
            </section>
        );
    }

    return (
        <PageWithHeaderLayout title="Candidatura de Adoção">
            <section className="flex-1 bg-orange-50 py-12 px-4 font-raleway font-medium">
                <div className="max-w-[1100px] mx-auto">
                    <button
                        onClick={() => navigate('/home')}
                        aria-label="Voltar"
                        className="flex items-center gap-2 p-1 font-semibold mb-6 cursor-pointer hover:underline text-brown"
                    >
                        <IoIosArrowBack className="size-4 text-brown" aria-hidden="true" /> Voltar
                    </button>
                </div>
                <div className="mx-auto flex flex-col items-center">
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-[5px] p-5 space-y-6 w-full max-w-[400px] sm:p-8 sm:max-w-[500px]"
                    >
                        <div className="text-center">
                            <img src={IconBox} alt="Ícone de gato e cachorro" className="mx-auto mb-4 h-16 w-16" />
                            <h2 className="font-bold text-1xl mb-2">
                                Parabéns por escolher adotar!
                            </h2>
                            <p className="text-sm text-justify">
                                Ficamos muito felizes em saber que você pode ter achado uma potencial nova companhia por aqui. Agora, para se candidatar a adotar o pet, você só precisa enviar uma mensagem ao responsável por ele, demonstrando seu interesse, explicando porque deseja adotá-lo, como é o ambiente que você tem a oferecer ao pet e outras informações que também achar relevante.
                            </p>
                        </div>

                        <div>
                            <textarea
                                id="message"
                                rows={8}
                                className="resize-none w-full rounded-md border bg-transparent px-3 py-2 outline-none"
                                placeholder="Escreva sua mensagem..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <fieldset>
                            <Label className="font-semibold mb-3 text-gray-800">
                                Receber contato do responsável via
                            </Label>
                            <div className="flex flex-col items-start gap-2 mt-2">
                                <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio" id="whatsapp" name="contactMethod" value="whatsapp"
                                        checked={contactMethod === "whatsapp"} onChange={() => setContactMethod("whatsapp")}
                                        className="h-4 w-4"
                                    />
                                    <span>WhatsApp</span>
                                </Label>
                                <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="radio" id="email" name="contactMethod" value="email"
                                        checked={contactMethod === "email"} onChange={() => setContactMethod("email")}
                                        className="h-4 w-4"
                                    />
                                    <span>E-mail</span>
                                </Label>
                            </div>
                        </fieldset>

                        <div className="flex justify-center pt-2">
                            <RoundButton text="Enviar" color="blue" onClick={() => formRef.current?.requestSubmit()} />
                        </div>
                    </form>
                </div>
            </section>
        </PageWithHeaderLayout>
    );
}

