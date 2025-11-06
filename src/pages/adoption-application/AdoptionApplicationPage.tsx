import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import PageWithHeaderLayout from "@/layouts/PageWithHeaderLayout";
import RoundButton from "@/components/RoundButton";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IoIosArrowBack } from "react-icons/io";
import IconBox from "@/assets/icons/pets-box.png";
import { toast } from "sonner";

import { useForm } from "@/hooks/useForm";
import { type AdoptionApplicationData, validateAdoptionApplication } from "@/lib/validators";

import type { Pet } from "@/types/api";
import { petService } from "@/services/petService";

export default function AdoptionApplicationPage() {
    const { id: petId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);

    // Estados para guardar os dados do pet e controlar o loading
    const [pet, setPet] = useState<Pet | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPet = async () => {
            if (!petId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const result = await petService.getPetById(Number(petId));

                if (result.success && result.data) {
                    setPet(result.data);
                } else {
                    console.error('Erro ao buscar pet:', result.error);
                }
            } catch (error) {
                console.error('Erro ao buscar pet:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [petId]);

    const {
        formData,
        errors,
        handleChange,
        handleSubmit,
        setFormData
    } = useForm<AdoptionApplicationData>(
        { message: '', contactMethod: 'whatsapp' },
        validateAdoptionApplication,
        (values) => {
            console.log("Enviando candidatura:", { petId, ...values });
            toast.success("Candidatura enviada com sucesso!");

            setTimeout(() => {
                navigate(`/pet/${petId}`);
            }, 2000);
        }
    );

    // Contador de caracteres
    const charCount = formData.message.trim().length;
    const minChars = 200;

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
                        onClick={() => navigate(-1)}
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
                                value={formData.message}
                                onChange={handleChange}
                            />

                            <div className="flex justify-between items-start w-full mt-1 text-xs">
                                {errors.message && <p className="text-red-500">{errors.message}</p>}
                                <span
                                    className={`ml-auto ${charCount < minChars ? "text-gray-500" : "text-green-600 font-semibold"}`}
                                >
                                    {charCount}/{minChars}
                                </span>
                            </div>
                        </div>

                        <fieldset>
                            <Label className="font-semibold mb-3 text-gray-800">
                                Receber contato do responsável via
                            </Label>
                            <RadioGroup
                                value={formData.contactMethod}
                                onValueChange={(value) =>
                                    setFormData((prev) => ({ ...prev, contactMethod: value as "whatsapp" | "email" }))
                                }
                                className="flex flex-col items-start gap-3 mt-2"
                            >
                                <Label
                                    htmlFor="whatsapp"
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <RadioGroupItem id="whatsapp" value="whatsapp" />
                                    <span>WhatsApp</span>
                                </Label>

                                <Label
                                    htmlFor="email"
                                    className="flex items-center gap-2 cursor-pointer"
                                >
                                    <RadioGroupItem id="email" value="email" />
                                    <span>E-mail</span>
                                </Label>
                            </RadioGroup>
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
