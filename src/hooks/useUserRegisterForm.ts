import { useState } from 'react';
import {
    validateRegistrationStep1,
    validateRegistrationStep2
} from '@/lib/validators';
import type {
    RegistrationStep1Data,
    RegistrationStep2Data
} from '@/lib/validators';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import type { UserForm, PreferencesForm, Address } from '@/types/api';

type UserFormData = RegistrationStep1Data & RegistrationStep2Data & { maxDistance: number };

const initialFormData: UserFormData = {
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
    address: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    email: "",
    password: "",
    confirmPassword: "",
    species: '',
    gender: '',
    size: '',
    age: '',
    personality: {
        active: false,
        goodWithPets: false,
        calm: false,
        goodWithKids: false,
        extrovert: false,
        introvert: false,
    },
    maxDistance: 5,
};

export const useUserRegisterForm = () => {
    const [formData, setFormData] = useState<UserFormData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, name, value } = e.target;
        const fieldName = (id || name) as keyof UserFormData;

        setFormData(prev => ({ ...prev, [fieldName]: value as any }));

        if (errors[fieldName]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    };

    const handleValueChange = (name: keyof UserFormData, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handlePersonalityChange = (key: string, checked: boolean) => {
        const newPersonality = { ...formData.personality, [key]: checked };
        setFormData(prev => ({ ...prev, personality: newPersonality }));

        const isAnyChecked = Object.values(newPersonality).some(v => v);
        if (isAnyChecked && errors.personality) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.personality;
                return newErrors;
            });
        }
    };

    const validateRegistrationForm = () => {
        const validationErrors = validateRegistrationStep1(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validatePreferenceForm = () => {
        const validationErrors = validateRegistrationStep2(formData);
        setErrors(prevErrors => ({ ...prevErrors, ...validationErrors }));
        return Object.keys(validationErrors).length === 0;
    };

    const registerUser = async (): Promise<{ success: boolean; error?: string }> => {
        try {
            // Preparar dados do usuário
            const address: Address = {
                street: formData.address,
                number: parseInt(formData.number) || 0,
                neighborhood: formData.neighborhood,
                city: formData.city,
                state: formData.state
            };

            const userForm: UserForm = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                phone: formData.phone,
                address: address,
                email: formData.email,
                password: formData.password
            };

            // Registrar usuário
            const userResult = await authService.register(userForm);

            if (!userResult.success || !userResult.data) {
                // Verificar se é erro de email duplicado
                const errorMessage = userResult.error || '';

                if (errorMessage.includes('email') &&
                    (errorMessage.includes('já existe') ||
                        errorMessage.includes('já está em uso') ||
                        errorMessage.includes('duplicate') ||
                        errorMessage.includes('unique') ||
                        errorMessage.includes('viola a restrição de unicidade'))) {

                    // Adicionar erro específico no campo email
                    setErrors(prev => ({
                        ...prev,
                        email: 'Este email já está cadastrado. Tente fazer login ou use outro email.'
                    }));

                    return { success: false, error: 'Este email já está cadastrado. Tente fazer login ou use outro email.' };
                }

                // Retornar a mensagem específica do backend
                return { success: false, error: errorMessage || 'Erro ao criar usuário' };
            }

            // Criar preferências
            const preferencesForm: PreferencesForm = {
                userId: userResult.data.id,
                species: formData.species,
                gender: formData.gender,
                age: formData.age,
                size: formData.size,
                active: formData.personality.active,
                goodWithPets: formData.personality.goodWithPets,
                calm: formData.personality.calm,
                goodWithKids: formData.personality.goodWithKids,
                extrovert: formData.personality.extrovert,
                introvert: formData.personality.introvert,
                maxDistance: formData.maxDistance
            };

            const preferencesResult = await userService.savePreferences(preferencesForm);

            if (!preferencesResult.success) {
                console.warn('Erro ao salvar preferências:', preferencesResult.error);
                // Não falha o registro se as preferências não foram salvas
            }

            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleValueChange,
        handlePersonalityChange,
        validateRegistrationForm,
        validatePreferenceForm,
        registerUser
    };
};