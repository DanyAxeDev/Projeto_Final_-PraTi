import { useForm } from './useForm';
import { validateLogin } from '@/lib/validators';
import type { LoginData } from '@/lib/validators';
import { toast } from "sonner";
import { useNavigate } from 'react-router';
import { useUser } from '@/hooks/useUser';
import { useState } from 'react';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const { login } = useUser();
    const initialState: LoginData = { email: "", password: "" };
    const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

    const handleLoginSuccess = async (formData: LoginData) => {
        try {
            // Limpar erros anteriores
            setLoginErrors({});

            const result = await login(formData.email, formData.password);

            if (result.success) {
                toast.success("Login efetuado com sucesso!");
                navigate("/home");
            } else {
                const errorMessage = result.error || "Erro ao fazer login";

                // Verificar se é erro de email não cadastrado
                if (errorMessage.includes("não cadastrado") || errorMessage.includes("Email não encontrado")) {
                    setLoginErrors({ email: "E-mail não cadastrado" });
                }
                // Verificar se é erro de senha incorreta
                else if (errorMessage.includes("senha incorreta") || errorMessage.includes("credenciais inválidas")) {
                    setLoginErrors({ password: "Senha incorreta" });
                }
                // Outros erros
                else {
                    toast.error(errorMessage);
                }
            }
        } catch (error) {
            toast.error("Erro inesperado ao fazer login");
            console.error("Login error:", error);
        }
    };

    const formHook = useForm(initialState, validateLogin, handleLoginSuccess);

    return {
        ...formHook,
        errors: { ...formHook.errors, ...loginErrors },
        setErrors: (errors: any) => {
            setLoginErrors({});
            formHook.setErrors(errors);
        }
    };
};