import HeadingWithLine from "@/components/HeadingWithLine";
import RoundButton from "@/components/RoundButton";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { useShareStoryForm } from "@/hooks/useShareStoryForm"; 
import { useRef, useEffect} from "react"; 

export default function ShareEstories() {
    const { 
        formData, 
        errors,       
        handleChange, 
        handleFileChange, 
        handleSubmit 
    } = useShareStoryForm();

    const formRef = useRef<HTMLFormElement>(null); 
    const fileInputRef = useRef<HTMLInputElement>(null); 
    useEffect(() => {
        if (!formData.foto && fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [formData.foto]);

    return (
        <section className="flex-1 py-12 px-4 font-raleway font-medium">
            <div className="flex flex-col gap-8 items-center mb-4 sm:mb-6">
                <HeadingWithLine text="Compartilhar minha história" />

                <form                   
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="bg-white shadow-md rounded-[5px] p-5 space-y-6 w-full max-w-[400px] sm:p-8 sm:max-w-[500px]"
                    noValidate
                >
                    <div>
                        <Label className="mb-1 font-semibold" htmlFor="nome">Seu nome</Label>
                        <Input type="text" id="nome" value={formData.nome} onChange={handleChange} />
                        {errors.nome && <p className="text-red-500 text-xs mt-1">{errors.nome}</p>}
                    </div>

                    <div>
                        <Label className="mb-1 font-semibold" htmlFor="nomePet">Nome do pet</Label>
                        <Input type="text" id="nomePet" value={formData.nomePet} onChange={handleChange} />
                        {errors.nomePet && <p className="text-red-500 text-xs mt-1">{errors.nomePet}</p>}
                    </div>

                    <div>
                        <Label className="mb-1 font-semibold" htmlFor="historia">Sua história de adoção</Label>
                        <textarea
                            id="historia"
                            rows={8}
                            className="resize-none w-full rounded-md border bg-transparent px-3 py-1 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] md:text-sm"
                            value={formData.historia}                           
                            onChange={handleChange}
                        ></textarea>
                        {errors.historia && <p className="text-red-500 text-xs mt-1">{errors.historia}</p>}
                    </div>

                    <div>
                        <Label className="mb-1 font-semibold" htmlFor="foto">Foto sua e com o pet</Label>
                        <Input
                            type="file"
                            id="foto"
                            accept="image/*"
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                            className="rounded-full max-w-[300px] font-semibold text-brown bg-gray-100"
                        />
                        {errors.foto && <p className="text-red-500 text-xs mt-1">{errors.foto}</p>}
                    </div>

                    <div className="flex justify-center mt-8">
                       <RoundButton text="Enviar" color="blue" onClick={() => {}} />
                    </div>
                </form>
            </div>
        </section>

    );
}