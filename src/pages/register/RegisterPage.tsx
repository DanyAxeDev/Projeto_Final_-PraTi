import { useState, useRef } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialIcon from "@/components/SocialLoginButton";
import { IoIosArrowBack } from "react-icons/io";
import { useRegisterForm } from "@/hooks/useRegisterForm";
import RoundButton from "@/components/RoundButton";
import FormStepHeading from "@/components/FormStepHeading";

import googleIcon from "@/assets/icons/icon-google.png";

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const { formData, errors, handleChange, validateStep1, validateStep2 } = useRegisterForm();

    const formStep1Ref = useRef<HTMLFormElement>(null);
    const formStep2Ref = useRef<HTMLFormElement>(null);

    const handleGoogleLogin = () => {
        console.log("Iniciando cadastro com Google...");
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep1()) {
            setCurrentStep(2);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep2()) {
            console.log("Validação da Etapa 2 passou! Finalizando cadastro com os dados:", formData);
        } else {
            console.log("Validação da Etapa 2 falhou.");
        }
    };

    return (
        <section className="flex items-center justify-center w-full p-4 bg-sand sm:p-8 min-h-screen">
            <div className="relative flex w-full max-w-6xl h-[1000px] overflow-hidden bg-white rounded-lg shadow-lg font-raleway font-medium" /* style={{ minHeight: '90vh' }} */>
                <Link to="/" className="absolute top-5 left-5 z-10">
                    <Button size="icon" className="rounded-full cursor-pointer">
                        <IoIosArrowBack className="size-5" />
                        <span className="sr-only">Voltar para a Home</span>
                    </Button>
                </Link>
                <div className="hidden lg:block lg:w-1/2 bg-gray-200">
                    <img src="/backgrounds/cadastro-bg-desktop.jpg" alt="Dois gatos" className="object-cover w-full h-full" />
                </div>
                <div className="flex flex-col justify-center w-full p-8 space-y-6 lg:w-1/2 sm:p-12 overflow-y-auto">
                    <div className="text-center">
                        <h2 className="text-4xl font-tilt text-brown">Cadastro</h2>
                    </div>

                    <div className="text-center">
                        <p className="text-sm">Continuar com</p>
                        <div className="flex justify-center gap-4 mt-3">
                            <SocialIcon
                                icon={<img src={googleIcon} alt="Google icon" className="size-4" />}
                                onClick={handleGoogleLogin}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <hr className="flex-grow border-gray-200" />
                        <span className="mx-4 text-xs uppercase">Ou</span>
                        <hr className="flex-grow border-gray-200" />
                    </div>

                    {currentStep === 1 && (
                        <form ref={formStep1Ref} onSubmit={handleNextStep} className="space-y-4">
                            <FormStepHeading step={1} title="Dados pessoais" />
                            <div className="grid grid-cols-2 gap-4">
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="firstName" className="mb-1 font-semibold">Nome</Label>
                                    <Input id="firstName" placeholder="Seu nome" required value={formData.firstName} onChange={handleChange} />
                                    {errors.firstName && <p className="text-xs text-red-600">{errors.firstName}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="lastName" className="mb-1 font-semibold">Sobrenome</Label>
                                    <Input id="lastName" placeholder="Seu sobrenome" required value={formData.lastName} onChange={handleChange} />
                                    {errors.lastName && <p className="text-xs text-red-600">{errors.lastName}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="birthDate" className="mb-1 font-semibold">Data de nascimento</Label>
                                    <Input id="birthDate" type="date" required value={formData.birthDate} onChange={handleChange} />
                                    {errors.birthDate && <p className="text-xs text-red-600">{errors.birthDate}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="phone" className="mb-1 font-semibold">Telefone</Label>
                                    <Input id="phone" type="tel" placeholder="(00) 90000-0000" required value={formData.phone} onChange={handleChange} />
                                    {errors.phone && <p className="text-xs text-red-600">{errors.phone}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="address" className="mb-1 font-semibold">Endereço</Label>
                                    <Input id="address" placeholder="Rua, Avenida, etc." required value={formData.address} onChange={handleChange} />
                                    {errors.address && <p className="text-xs text-red-600">{errors.address}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="number" className="mb-1 font-semibold">Número</Label>
                                    <Input id="number" placeholder="123 ou S/N" required value={formData.number} onChange={handleChange} />
                                    {errors.number && <p className="text-xs text-red-600">{errors.number}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="neighborhood" className="mb-1 font-semibold">Bairro</Label>
                                    <Input id="neighborhood" placeholder="Seu bairro" required value={formData.neighborhood} onChange={handleChange} />
                                    {errors.neighborhood && <p className="text-xs text-red-600">{errors.neighborhood}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="city" className="mb-1 font-semibold">Cidade</Label>
                                    <Input id="city" placeholder="Sua cidade" required value={formData.city} onChange={handleChange} />
                                    {errors.city && <p className="text-xs text-red-600">{errors.city}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="state" className="mb-1 font-semibold">Estado</Label>
                                    <Input id="state" placeholder="Seu estado" required value={formData.state} onChange={handleChange} />
                                    {errors.state && <p className="text-xs text-red-600">{errors.state}</p>}
                                </div>
                                <div className="col-span-2">
                                    <Label htmlFor="email" className="mb-1 font-semibold">E-mail</Label>
                                    <Input id="email" type="email" placeholder="seu@email.com" required value={formData.email} onChange={handleChange} />
                                    {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="password" className="mb-1 font-semibold">Senha</Label>
                                    <Input id="password" type="password" placeholder="********" required value={formData.password} onChange={handleChange} />
                                    {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <Label htmlFor="confirmPassword" className="mb-1 font-semibold">Confirmar senha</Label>
                                    <Input id="confirmPassword" type="password" placeholder="********" required value={formData.confirmPassword} onChange={handleChange} />
                                    {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword}</p>}
                                </div>
                            </div>
                            <div className="flex justify-center pt-2 mt-8">
                                <RoundButton
                                    text="Próximo"
                                    color="blue"
                                    onClick={() => formStep1Ref.current?.requestSubmit()}
                                />
                            </div>
                        </form>
                    )}

                    {currentStep === 2 && (
                        <form ref={formStep2Ref} onSubmit={handleRegister} className="space-y-4">
                            <FormStepHeading step={2} title="Dados de preferência" />
                            <div className="space-y-6">
                                <div>
                                    <Label className="mb-1 font-semibold">Eu desejo ver...</Label>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                        <label className="flex items-center gap-2"><input type="radio" name="species" value="dog" className="size-4 text-primary" onChange={handleChange} checked={formData.species === 'dog'} /><span>Cães</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="species" value="cat" className="size-4 text-primary" onChange={handleChange} checked={formData.species === 'cat'} /><span>Gatos</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="species" value="other" className="size-4 text-primary" onChange={handleChange} checked={formData.species === 'other'} /><span>Outros</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="species" value="no-preference" className="size-4 text-primary" onChange={handleChange} checked={formData.species === 'no-preference'} /><span>Não tenho preferência</span></label>
                                    </div>
                                    {errors.species && <p className="text-xs text-red-600">{errors.species}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Eu prefiro um pet...</Label>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                        <label className="flex items-center gap-2"><input type="radio" name="gender" value="male" className="size-4 text-primary" onChange={handleChange} checked={formData.gender === 'male'} /><span>Macho</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="gender" value="female" className="size-4 text-primary" onChange={handleChange} checked={formData.gender === 'female'} /><span>Fêmea</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="gender" value="no-preference" className="size-4 text-primary" onChange={handleChange} checked={formData.gender === 'no-preference'} /><span>Não tenho preferência</span></label>
                                    </div>
                                    {errors.gender && <p className="text-xs text-red-600">{errors.gender}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Com idade...</Label>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                        <label className="flex items-center gap-2"><input type="radio" name="age" value="up-to-2" className="size-4 text-primary" onChange={handleChange} checked={formData.age === 'up-to-2'} /><span>Até 2 anos</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="age" value="up-to-5" className="size-4 text-primary" onChange={handleChange} checked={formData.age === 'up-to-5'} /><span>Até 5 anos</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="age" value="no-preference" className="size-4 text-primary" onChange={handleChange} checked={formData.age === 'no-preference'} /><span>Não tenho preferência</span></label>
                                    </div>
                                    {errors.age && <p className="text-xs text-red-600">{errors.age}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">De porte...</Label>
                                    <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                        <label className="flex items-center gap-2"><input type="radio" name="size" value="small" className="size-4 text-primary" onChange={handleChange} checked={formData.size === 'small'} /><span>Pequeno</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="size" value="medium" className="size-4 text-primary" onChange={handleChange} checked={formData.size === 'medium'} /><span>Médio</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="size" value="large" className="size-4 text-primary" onChange={handleChange} checked={formData.size === 'large'} /><span>Grande</span></label>
                                        <label className="flex items-center gap-2"><input type="radio" name="size" value="no-preference" className="size-4 text-primary" onChange={handleChange} checked={formData.size === 'no-preference'} /><span>Não tenho preferência</span></label>
                                    </div>
                                    {errors.size && <p className="text-xs text-red-600">{errors.size}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Personalidade que procuro em um pet</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-active" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.active} /><span>Ativo</span></label>
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-goodWithPets" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.goodWithPets} /><span>Se dá bem com outros pets</span></label>
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-calm" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.calm} /><span>Calmo</span></label>
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-goodWithKids" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.goodWithKids} /><span>Se dá bem com crianças</span></label>
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-extrovert" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.extrovert} /><span>Extrovertido</span></label>
                                        <label className="flex items-center gap-2"><input type="checkbox" name="personality-introvert" className="size-4 text-primary rounded" onChange={handleChange} checked={formData.personality.introvert} /><span>Introvertido</span></label>
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="maxDistance" className="mb-2 font-semibold">Distância máxima</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Input id="maxDistance" type="range" className="w-3/4" min="1" max="100" step="1" value={formData.maxDistance} onChange={handleChange} />
                                        <span className="w-12 text-center">{formData.maxDistance} km</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 pt-2 mt-8">
                                <RoundButton
                                    text="Voltar"
                                    color="brown"
                                    onClick={handlePreviousStep}
                                />
                                <RoundButton
                                    text="Criar conta"
                                    color="blue"
                                    onClick={() => formStep2Ref.current?.requestSubmit()}
                                />
                            </div>
                        </form>
                    )}
                    <p className="text-sm text-center">
                        Já possui uma conta?{" "}
                        <Link to="/login" className="font-semibold text-brown underline-offset-4 hover:underline">Entre</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}