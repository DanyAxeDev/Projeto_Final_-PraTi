import { useState } from 'react';
import {
    validateRegistrationStep1,
    validateRegistrationStep2,
    validateBirthDate,
    validateEmail,
    validateName,
    validatePassword,
    validateConfirmPassword
} from '@/lib/validators';

// Dados iniciais do formulário
const initialFormData = {
    firstName: "", lastName: "", birthDate: "", phone: "", address: "",
    number: "", neighborhood: "", city: "", state: "", email: "",
    password: "", confirmPassword: "",
    species: "", gender: "", age: "", size: "",
    personality: {
        active: false, goodWithPets: false, calm: false, goodWithKids: false,
        extrovert: false, introvert: false,
    },
    maxDistance: 5,
};

export const useRegisterForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, name, value, type, checked } = e.target;
        let finalValue = value;
        if (id === 'firstName' || id === 'lastName') {
            finalValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
        }
           
        if (id === 'phone') {
            finalValue = value.replace(/\D/g, '');
        }
        
        const updatedFormData = { ...formData };
        if (type === 'checkbox' && name.startsWith('personality-')) {
            const personalityKey = name.replace('personality-', '');
            updatedFormData.personality[personalityKey as keyof typeof updatedFormData.personality] = checked;
        } else {
            const key = type === 'radio' ? name : id;
            (updatedFormData as any)[key] = finalValue;
        }
        setFormData(updatedFormData);

        // Validação de campo individual
        let error;
        switch (id) {
            case 'firstName': error = validateName(finalValue, "Nome"); break;
            case 'lastName': error = validateName(finalValue, "Sobrenome"); break;
            case 'birthDate': error = validateBirthDate(finalValue); break;
            case 'email': error = validateEmail(finalValue); break;
            case 'password':
                error = validatePassword(finalValue);
                const confirmError = validateConfirmPassword(finalValue, formData.confirmPassword);
                setErrors(prev => ({ ...prev, confirmPassword: confirmError }));
                break;
            case 'confirmPassword':
                error = validateConfirmPassword(formData.password, finalValue);
                break;
            default: return;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const validateStep1 = () => {
        const validationErrors = validateRegistrationStep1(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validateStep2 = () => {
        const validationErrors = validateRegistrationStep2(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, errors, handleChange, validateStep1, validateStep2 };
};