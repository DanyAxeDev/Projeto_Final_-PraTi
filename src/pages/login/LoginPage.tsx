import { useRef } from "react";
import { Link, Navigate } from "react-router";
import { Button } from "@/components/ui/button";
import RoundButton from "@/components/RoundButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLoginButton from "@/components/SocialLoginButton";
import { IoIosArrowBack } from "react-icons/io";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useUser } from "@/hooks/useUser";

import googleIcon from "@/assets/icons/icon-google.png";
import faceIcon from "@/assets/icons/icon-facebook.png";
import linkedinIcon from "@/assets/icons/icon-linkedin.png";

export default function LoginPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const { formData, errors, handleChange, handleSubmit } = useLoginForm();
    const { user } = useUser()

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

    // Não mostra a tela de login se o usuário já estiver logado
    if (user) return <Navigate to="/home" />

    return (
        <section className="flex items-center justify-center bg-sand w-full h-full p-4 sm:p-8 min-h-screen font-raleway font-medium">
            <div className="relative flex w-full max-w-6xl overflow-hidden bg-white rounded-lg shadow-lg" style={{ minHeight: '90vh' }}>
                <Link to="/" className="absolute top-5 left-5 z-10">
                    <Button variant="ghost" size="icon" className="rounded-full cursor-pointer">
                        <IoIosArrowBack className="size-5" />
                        <span className="sr-only">Voltar para a Home</span>
                    </Button>
                </Link>

                <div className="flex flex-col justify-center w-full p-8 space-y-8 lg:w-[35%] sm:p-12">
                    <div className="text-center">
                        <h1 className="text-4xl font-tilt text-brown">Login</h1>
                    </div>

                    <div className="text-center">
                        <p className="text-sm">Continuar com</p>
                        <div className="flex justify-center gap-4 mt-3">
                            <SocialLoginButton icon={<img src={googleIcon} alt="Login com Google" className="size-4" />} onClick={handleGoogleLogin} />
                            <SocialLoginButton icon={<img src={faceIcon} alt="Login com Facebook" className="size-4" />} onClick={handleFacebookLogin} />
                            <SocialLoginButton icon={<img src={linkedinIcon} alt="Login com LinkedIn" className="size-4" />} onClick={handleLinkedinLogin} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <hr className="flex-grow border-gray-200" />
                        <span className="mx-4 text-xs uppercase">Ou</span>
                        <hr className="flex-grow border-gray-200" />
                    </div>
                
                    <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-semibold">E-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange}  />
                            {errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-sm font-semibold">Senha</Label>
                            <Input id="password" type="password" placeholder="********" value={formData.password} onChange={handleChange}  />
                            {errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
                        </div>
                        <div className="flex justify-center pt-2 mt-5 mb-2">
                            <RoundButton
                                text="Entrar"
                                color="blue"
                                onClick={() => formRef.current?.requestSubmit()}
                            />
                        </div>
                    </form>

                    <p className="text-sm text-center">
                        Ainda não possui uma conta?{" "}
                        <Link to="/cadastro" className="font-semibold text-brown underline-offset-4 hover:underline">
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