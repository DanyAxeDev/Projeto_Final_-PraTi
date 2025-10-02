import { useForm } from './useForm';
import { validateLogin } from '@/lib/validators';
import type { LoginData } from '@/lib/validators';
import { toast } from "sonner";
import { useNavigate } from 'react-router';

export const useLoginForm = () => {
    const navigate = useNavigate();
    const initialState: LoginData = { email: "", password: "" };

    const handleLoginSuccess = (formData: LoginData) => {
        console.log("Login bem-sucedido!", formData);
        toast.success("Login efetuado com sucesso!");
        navigate("/home");
    };

    return useForm(initialState, validateLogin, handleLoginSuccess);
};