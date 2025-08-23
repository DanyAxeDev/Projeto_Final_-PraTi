import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SocialLoginButton from "./components/SocialLoginButton";
import { FaGoogle, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io"; 

export default function LoginPage() {
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

    return (
        <section className="flex items-center justify-center w-full h-full p-4 sm:p-8">

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
                            <SocialLoginButton icon={<FaGoogle />} onClick={handleGoogleLogin} />
                            <SocialLoginButton icon={<FaFacebookF />} onClick={handleFacebookLogin} />
                            <SocialLoginButton icon={<FaLinkedinIn />} onClick={handleLinkedinLogin} />
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex-grow border-t border-gray-200"></div>
                        <span className="mx-4 text-xs text-gray-400 uppercase">Ou</span>
                        <div className="flex-grow border-t border-gray-200"></div>
                    </div>

                    <form className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email">E-mail</Label>
                            <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <Input id="password" type="password" placeholder="********" />
                        </div>
                        <Button type="submit" className="w-full">
                            Entrar
                        </Button>
                    </form>

                    <p className="text-sm text-center text-gray-600">
                        Ainda não possui uma conta?{" "}
                        <Link to="/register" className="font-medium text-primary underline-offset-4 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </div>

                <div className="hidden lg:block lg:w-[70%] bg-gray-200">
                    {/* <img src="/caminho/para/imagem.jpg" alt="Descrição da imagem" className="object-cover w-full h-full" /> */}
                </div>

            </div>
        </section>
    );
}