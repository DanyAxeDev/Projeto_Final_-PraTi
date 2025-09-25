// src/pages/share-stories/ShareEstories.tsx
import React, { FormEvent } from "react";
import HeadingWithLine from "@/components/HeadingWithLine";
import RoundButton from "@/components/RoundButton";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

export default function ShareEstories() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulário enviado!");
    };

    return (
            <section className="flex-1 py-12 px-4 font-raleway font-medium">
                <div className="flex flex-col gap-8 items-center mb-6">
                    <HeadingWithLine text="Compartilhar minha história" />

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-[5px] p-8 space-y-6 w-[500px]"
                    >
                        {/* Nome */}
                        <div>
                            <Label className="mb-1 font-semibold" htmlFor="nome">
                                Seu nome
                            </Label>
                            <Input
                                type="text"
                                id="nome"
                                required
                            />
                        </div>

                        {/* Nome do Pet */}
                        <div>
                            <Label
                                className="mb-1 font-semibold"
                                htmlFor="nome-pet"
                            >
                                Nome do pet
                            </Label>
                            <Input
                                type="text"
                                id="nome-pet"
                                required
                            />
                        </div>

                        {/* História */}
                        <div>
                            <Label
                                className="mb-1 font-semibold"
                                htmlFor="historia"
                            >
                                Sua história de adoção
                            </Label>
                            <textarea
                                id="historia"
                                rows={8}
                                className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"
                                required
                            ></textarea>
                        </div>

                        {/* Foto */}
                        <div>
                            <Label className="mb-1 font-semibold" htmlFor="foto">
                                Foto sua e com o pet
                            </Label>
                            <Input
                                type="file"
                                id="foto"
                                accept="image/*"
                                className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100"
                            />
                        </div>

                        {/* Botão */}
                        <div className="flex justify-center mt-8">
                            <RoundButton text="Enviar" color="blue" onClick={() => ""} />
                        </div>
                    </form>
                </div>
            </section>
    );
}
