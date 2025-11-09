import { useState, useEffect } from 'react';
import {
    validateUpdateData,
    validateName,
    validateBirthDate,
    validatePhone,
    validateEmail,
    validateRequiredField
} from '@/lib/validators';
import type { RegistrationStep1Data } from '@/lib/validators';
import { userService } from '@/services/userService';
import { useUser } from './useUser';
import { toast } from 'sonner';

const initialUserData: RegistrationStep1Data = {
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    email: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    password: "",
    confirmPassword: "", 
};

const fieldValidators: { [key in keyof Omit<RegistrationStep1Data, 'password' | 'confirmPassword'>]: (value: string) => string | undefined } = {
    firstName: (value) => validateName(value, "Nome"),
    lastName: (value) => validateName(value, "Sobrenome"),
    birthDate: validateBirthDate,
    phone: validatePhone,
    email: validateEmail,
    address: (value) => validateRequiredField(value, "Endereço"),
    number: (value) => validateRequiredField(value, "Número"),
    neighborhood: (value) => validateRequiredField(value, "Bairro"),
    city: (value) => validateRequiredField(value, "Cidade"),
    state: (value) => validateRequiredField(value, "Estado"),
};

export const useUpdateDataForm = (initialData: RegistrationStep1Data = initialUserData) => {
    const [formData, setFormData] = useState<RegistrationStep1Data>(initialData);
    const [errors, setErrors] = useState<Partial<Record<keyof RegistrationStep1Data, string>>>({});
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    // Carregar dados do usuário atual
    useEffect(() => {
        if (user?.id) {
            loadUserData();
        }
    }, [user?.id]);

    const loadUserData = async () => {
        if (!user?.id) return;

        try {
            const result = await userService.getCurrentUser();
            if (result.success && result.data) {
                const userData: RegistrationStep1Data = {
                    firstName: result.data.firstName || "",
                    lastName: result.data.lastName || "",
                    birthDate: result.data.birthDate || "",
                    phone: result.data.phone || "",
                    email: result.data.email || "",
                    address: result.data.address?.street || "",
                    number: result.data.address?.number?.toString() || "",
                    neighborhood: result.data.address?.neighborhood || "",
                    city: result.data.address?.city || "",
                    state: result.data.address?.state || "",
                    password: "",
                    confirmPassword: "",
                };
                setFormData(userData);
            }
        } catch (error) {
            console.error('Erro ao carregar dados do usuário:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, name, value } = e.target;
        const fieldName = (id || name) as keyof RegistrationStep1Data;

        setFormData(prev => ({ ...prev, [fieldName]: value }));

        const validator = fieldValidators[fieldName as keyof typeof fieldValidators];
        if (validator) {
            const error = validator(value);
            setErrors(prev => ({ ...prev, [fieldName]: error }));
        }
    };

    const handleCancel = () => {
        // Sempre reseta para os valores iniciais primeiro
        setFormData(initialData);
        setErrors({});

        // Se o usuário está logado, recarrega os dados dele
        if (user?.id) {
            loadUserData();
        }
    };

    const validateAll = () => {
        const validationErrors = validateUpdateData(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const saveUserData = async () => {
        if (!user?.id) {
            toast.error("Usuário não encontrado");
            return false;
        }

        setIsLoading(true);
        try {
            const updateData = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                phone: formData.phone,
                email: formData.email,
                address: {
                    street: formData.address,
                    number: parseInt(formData.number) || 0,
                    neighborhood: formData.neighborhood,
                    city: formData.city,
                    state: formData.state,
                }
            };

            const result = await userService.updateUser(user.id, updateData);
            if (result.success) {
                toast.success("Dados atualizados com sucesso!");
                return true;
            } else {
                toast.error(result.error || "Erro ao atualizar dados");
                return false;
            }
        } catch (error) {
            toast.error("Erro ao atualizar dados");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        validateAll,
        handleCancel,
        saveUserData,
        setFormData, 
        setErrors    
    };
};