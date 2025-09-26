import { useNavigate } from 'react-router';
import { toast } from "sonner";
import { useForm } from "@/hooks/useForm"; 
import type { FormSetter } from "@/hooks/useForm"; 
import { validateShareStory } from '@/lib/validators';
import type { IStoryData } from '@/lib/validators'; 

const initialState: IStoryData = {
    nome: '',
    nomePet: '',
    historia: '',
    foto: null,
};

export const useShareStoryForm = () => { 
    const navigate = useNavigate();

    const onSubmitSuccess = (
        formData: IStoryData,
        setFormData: FormSetter<IStoryData> 
    ) => {
        console.log("Formulário válido, enviando história:", formData);
        toast.success("Sua história foi enviada para aprovação!");
        
        setFormData(initialState);
        
        navigate("/home");
    };

    return useForm<IStoryData>(
        initialState, 
        validateShareStory, 
        onSubmitSuccess 
    );
};