// src/pages/share-stories/ShareEstories.tsx
import React, { FormEvent } from "react";

export default function ShareEstories() {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulário enviado!");
    };

    return (
        <main className="min-h-screen flex flex-col bg-stone-100 text-stone-800">
            {/* CONTEÚDO PRINCIPAL */}
        
                <section className="flex-1 bg-[#f3ecdf] py-12 px-4">
            <div className="flex flex-col gap-8 items-center mb-6 text-center">
                    <h1 className="text-5xl font-bold text-brown mb-0 whitespace-nowrap text-center">
                        
                        Compartilhar minha história
                    </h1>
                    <div className="w-[500px] h-[2px] bg-brown mx-auto rounded"></div>

                    <form
                        onSubmit={handleSubmit}
                        className="bg-white shadow-md rounded-2xl p-6 space-y-4 text-left w-[500px]"
                    >
                        {/* Nome */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="nome">
                                Seu nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>

                        {/* Nome do Pet */}
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="nome-pet"
                            >
                                Nome do pet
                            </label>
                            <input
                                type="text"
                                id="nome-pet"
                                className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2"
                                required
                            />
                        </div>

                        {/* História */}
                        <div>
                            <label
                                className="block text-sm font-medium mb-1"
                                htmlFor="historia"
                            >
                                Sua história de adoção
                            </label>
                            <textarea
                                id="historia"
                                rows={4}
                                className="w-full rounded-md border border-stone-300 px-3 py-2 focus:outline-none focus:ring-2"
                                required
                            ></textarea>
                        </div>

                        {/* Foto */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="foto">
                                Foto sua e com o pet
                            </label>
                            <input
                                type="file"
                                id="foto"
                                
                                accept="image/*"
                                className="w-full text-sm text-stone-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                                file:bg-[var(--color-lightgray)] file:text-black 
                                hover:file:opacity-90"
                            />
                        </div>

                        {/* Botão */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-[var(--color-blue)] text-white px-6 py-2 rounded-full font-semibold hover:opacity-90 transition"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
