import { useState, useRef } from "react";
import { Link, useNavigate, Navigate } from "react-router"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialIcon from "@/components/SocialLoginButton";
import { IoIosArrowBack } from "react-icons/io";
import { useUserRegisterForm } from "@/hooks/useUserRegisterForm";
import RoundButton from "@/components/RoundButton";
import FormStepHeading from "@/components/FormStepHeading";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { useUser } from "@/hooks/useUser";
import { toast } from "sonner";
import { findAddress } from "@/services/cepService";
import type { ViaCepResponse } from "@/types/types";
import InputLoader from "@/components/InputLoader";

import googleIcon from "@/assets/icons/icon-google.png";

export default function RegisterPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSearching, setIsSearching] = useState(false);
    const [cepValue, setCepValue] = useState("");
    const { 
        formData, 
        errors, 
        setErrors,
        handleChange, 
        handleValueChange,
        handlePersonalityChange,
        validateRegistrationForm, 
        validatePreferenceForm,
        registerUser
    } = useUserRegisterForm();

    const formStep1Ref = useRef<HTMLFormElement>(null);
    const formStep2Ref = useRef<HTMLFormElement>(null);

    const { user } = useUser()

    const navigate = useNavigate(); 

    const handleGoogleLogin = () => {
        console.log("Iniciando cadastro com Google...");
    };

    const handleNextStep = (e: React.FormEvent) => {
        e.preventDefault();

        const isRestOfFormValid = validateRegistrationForm();

        let isCepValid = true;
        const cep = cepValue.replace(/\D/g, '');
        if (cep.length === 0) {
            setErrors((prev: typeof errors) => ({
                ...prev,
                cep: "CEP é obrigatório."
            } as any));
            isCepValid = false;
        }

        if (isRestOfFormValid && isCepValid) {
            setCurrentStep(2);
        }
    };

    const handlePreviousStep = () => {
        setCurrentStep(1);
    };

    const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 8) {
            value = value.slice(0, 8);
        }

        if (value.length > 5) {
            value = value.slice(0, 5) + '-' + value.slice(5, 8);
        }

        setCepValue(value);

        if ((errors as any).cep) {
            setErrors((prev: typeof errors) => {
                const newErrors = { ...prev };
                delete (newErrors as any).cep;
                return newErrors;
            });
        }
    };

    const searchCep = async () => {
        const cep = cepValue.replace(/\D/g, '');

        if (cep.length === 0) {
            return;
        }

        if (cep.length === 8) {
            try {
                setIsSearching(true);
                const data: ViaCepResponse = await findAddress(cep);

                if ((data as any).erro) {
                    toast.error("CEP não encontrado. Por favor, verifique o número.");
                    setErrors((prev: typeof errors) => ({ ...prev, cep: "CEP não encontrado." } as any));
                    formData.address = "";
                    formData.neighborhood = "";
                    formData.city = "";
                    formData.state = "";
                } else {
                    setErrors((prev: typeof errors) => {
                        const newErrors = { ...prev };
                        delete (newErrors as any).cep;
                        return newErrors;
                    });
                    formData.address = data.logradouro;
                    formData.neighborhood = data.bairro;
                    formData.city = data.localidade;
                    formData.state = data.uf;
                }
            } catch (e) {
                toast.error("Não foi possível consultar o CEP. Tente novamente.");
                setErrors((prev: typeof errors) => ({ ...prev, cep: "Falha ao consultar o CEP." } as any));
                console.log("Não foi possível procurar o endereço via CEP.", e);
            } finally {
                setIsSearching(false);
            }
        } else if (cep.length > 0 && cep.length < 8) {
            setErrors((prev: typeof errors) => ({ ...prev, cep: "CEP incompleto. Deve ter 8 dígitos." } as any));
        }
    };


    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validatePreferenceForm()) {
            try {
                const result = await registerUser();

                if (result.success) {
                    toast.success("Sua conta foi criada e suas preferências foram salvas. Agora você já pode encontrar seu novo melhor amigo!");
                    navigate("/login"); // Redirecionar para login após registro
                } else {
                    toast.error(result.error || "Erro ao criar conta");
                }
            } catch (error) {
                toast.error("Erro inesperado ao criar conta");
                console.error("Registration error:", error);
            }
        } else {
            toast.error("Por favor, corrija os erros no formulário");
        }
    };

    const ufs = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

    const personalityOptions = {
        active: "Ativo",
        goodWithPets: "Se dá bem com outros pets",
        calm: "Calmo",
        goodWithKids: "Se dá bem com crianças",
        extrovert: "Extrovertido",
        introvert: "Introvertido",
    };

    // Não mostra a tela de cadastro se o usuário já estiver logado
    if (user) return <Navigate to="/home" />

    return (
        <section className="flex items-center justify-center w-full px-4 py-12 bg-sand sm:p-8 min-h-screen">
            <div className="relative flex w-full max-w-6xl h-full overflow-hidden bg-white rounded-lg shadow-lg font-raleway font-medium sm:h-[1000px]">
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
                        <h2 className="text-4xl font-tilt text-brown mt-15">Cadastro</h2>
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
                        <form noValidate ref={formStep1Ref} onSubmit={handleNextStep} className="space-y-4">
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
                                <div className="col-span-2 relative">
                                    <Label htmlFor="cep" className="mb-1 font-semibold">CEP</Label>
                                    <Input
                                        id="cep"
                                        placeholder="00000-000"
                                        maxLength={9}
                                        value={cepValue}
                                        onChange={handleCepChange}
                                        onBlur={searchCep}
                                    />
                                    {(errors as any).cep && <p className="text-xs text-red-600">{(errors as any).cep}</p>}
                                    {isSearching && <InputLoader />}
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
                                    <select
                                        id="state"
                                        name="state"
                                        required
                                        value={formData.state}
                                        onChange={(e) => handleValueChange('state', e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="" disabled>Selecione</option>
                                        {ufs.map(uf => (
                                            <option key={uf} value={uf}>{uf}</option>
                                        ))}
                                    </select>
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
                                    <RadioGroup
                                        name="species"
                                        value={formData.species}
                                        onValueChange={(value) => handleValueChange('species', value)}
                                    >
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="cão" id="species-cão" />
                                                <Label htmlFor="species-cão">Cães</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="gato" id="species-gato" />
                                                <Label htmlFor="species-gato">Gatos</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="no-preference" id="species-no-preference" />
                                                <Label htmlFor="species-no-preference">Não tenho preferência</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    {errors.species && <p className="text-xs text-red-600">{errors.species}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Eu prefiro um pet...</Label>
                                    <RadioGroup
                                        name="gender"
                                        value={formData.gender}
                                        onValueChange={(value) => handleValueChange('gender', value)}
                                    >
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="male" id="gender-macho" />
                                                <Label htmlFor="gender-macho">Macho</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="female" id="gender-fêmea" />
                                                <Label htmlFor="gender-fêmea">Fêmea</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="no-preference" id="gender-no-preference" />
                                                <Label htmlFor="gender-no-preference">Não tenho preferência</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    {errors.gender && <p className="text-xs text-red-600">{errors.gender}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Com idade...</Label>
                                    <RadioGroup
                                        name="age"
                                        value={formData.age}
                                        onValueChange={(value) => handleValueChange('age', value)}
                                    >
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="filhote" id="age-filhote" />
                                                <Label htmlFor="age-filhote">Filhote</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="jovem" id="age-jovem" />
                                                <Label htmlFor="age-jovem">Jovem</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="adulto" id="age-adulto" />
                                                <Label htmlFor="age-adulto">Adulto</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="idoso" id="age-idoso" />
                                                <Label htmlFor="age-idoso">Idoso</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="no-preference" id="age-no-preference" />
                                                <Label htmlFor="age-no-preference">Não tenho preferência</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    {errors.age && <p className="text-xs text-red-600">{errors.age}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">De porte...</Label>
                                    <RadioGroup
                                        name="size"
                                        value={formData.size}
                                        onValueChange={(value) => handleValueChange('size', value)}
                                    >
                                        <div className="flex flex-wrap gap-4 mt-2 text-sm">
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="small" id="size-pequeno" />
                                                <Label htmlFor="size-pequeno">Pequeno</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="medium" id="size-medio" />
                                                <Label htmlFor="size-medio">Médio</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="large" id="size-grande" />
                                                <Label htmlFor="size-grande">Grande</Label>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <RadioGroupItem value="no-preference" id="size-no-preference" />
                                                <Label htmlFor="size-no-preference">Não tenho preferência</Label>
                                            </div>
                                        </div>
                                    </RadioGroup>
                                    {errors.size && <p className="text-xs text-red-600">{errors.size}</p>}
                                </div>
                                <div>
                                    <Label className="mb-1 font-semibold">Personalidade que procuro em um pet</Label>
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                                        {Object.entries(personalityOptions).map(([key, label]) => (
                                            <div className="flex items-center gap-2" key={key}>
                                                <Checkbox
                                                    id={`personality-${key}`}
                                                    checked={formData.personality[key as keyof typeof formData.personality]}
                                                    onCheckedChange={(checked) => handlePersonalityChange(key, checked as boolean)}
                                                />
                                                <Label htmlFor={`personality-${key}`}>{label}</Label>
                                            </div>
                                        ))}
                                    </div>
                                    {errors.personality && <p className="text-xs text-red-600">{errors.personality}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="maxDistance" className="mb-2 font-semibold">Distância máxima</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Slider
                                            id="maxDistance"
                                            name="maxDistance"
                                            min={1}
                                            max={100}
                                            step={1}
                                            value={[formData.maxDistance]}
                                            onValueChange={(value) => handleValueChange('maxDistance', value[0])}
                                        />
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