import { useRef } from "react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import RoundButton from "@/components/RoundButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLoginButton from "@/components/SocialLoginButton";
import { IoIosArrowBack } from "react-icons/io";

import googleIcon from "@/assets/icons/icon-google.png";
import faceIcon from "@/assets/icons/icon-facebook.png";
import linkedinIcon from "@/assets/icons/icon-linkedin.png";

export default function LoginPage() {
    const formRef = useRef<HTMLFormElement>(null);

    // Funções de exemplo para a lógica de login
    const handleGoogleLogin = () => {
        console.log("Iniciando login com Google...");
    };

    const handleFacebookLogin = () => {
        console.log("Iniciando login com Facebook...");
    };

    const handleLinkedinLogin = () => {
        console.log("Iniciando login com LinkedIn...");
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
        console.log("Login realizado com sucesso!");
    };

    return (
        <section className="flex items-center justify-center bg-sand w-full h-full p-4 sm:p-8 min-h-screen">

            <div className="relative flex w-full max-w-7xl overflow-hidden bg-white rounded-lg shadow-lg" style={{ minHeight: '90vh' }}>

                <Link to="/" className="absolute top-5 left-5 z-10">
                    <Button variant="ghost" size="icon">
                        <IoIosArrowBack className="size-5" />
                        <span className="sr-only">Voltar para a Home</span>
                    </Button>
                </Link>

                <div className="flex flex-col justify-center w-full p-8 space-y-8 lg:w-[30%] sm:p-12">

                    <div className="text-center">
                        <h2 className="text-3xl font-bold">Login</h2>
                    </div>

                    {/* Login com Redes Sociais */}
                    <div className="text-center">
                        <p className="text-sm text-gray-500">Continuar com</p>
                        <div className="flex justify-center gap-4 mt-3">
                            <SocialLoginButton icon={<img src={googleIcon} alt="Login com Google" className="size-4" />} onClick={handleGoogleLogin} />
                            <SocialLoginButton icon={<img src={faceIcon} alt="Login com Facebook" className="size-4" />} onClick={handleFacebookLogin} />
                            <SocialLoginButton icon={<img src={linkedinIcon} alt="Login com LinkedIn" className="size-4" />} onClick={handleLinkedinLogin} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-xs text-gray-400 uppercase">Ou</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form ref={formRef} className="space-y-5" onSubmit={onFormSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" />
                        </div>
                        <div className="flex justify-center pt-2 mt-5 mb-2">
                            <RoundButton
                                text="Entrar"
                                color="blue"
                                onClick={() => formRef.current?.requestSubmit()}
                            />
                        </div>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Ainda não possui uma conta?{" "}
                        <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>

                <div className="hidden lg:block lg:w-[70%] bg-gray-200">
                    <img src="/backgrounds/login-bg-desktop.jpg" alt="Dois cachorros" className="object-cover w-full h-full" />
                </div>

            </div>
        </section>
    );
}