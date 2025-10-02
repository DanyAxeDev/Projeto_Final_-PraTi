import { useState } from 'react';
import { 
    validateUpdateData,
    validateName,
    validateBirthDate,
    validatePhone,
    validateEmail,
    validateRequiredField
} from '@/lib/validators';
import type { RegistrationStep1Data } from '@/lib/validators';

const initialUserData: RegistrationStep1Data = {
    firstName: "Nome",
    lastName: "Sobrenome",
    birthDate: "1995-05-15",
    phone: "(99) 99999-9999",
    email: "usuario@email.com",
    address: "Rua Exemplo",
    number: "123",
    neighborhood: "Bairro",
    city: "Minha Cidade",
    state: "Meu Estado",
    password: "senhaValida123!", 
    confirmPassword: "senhaValida123!",
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const fieldName = id as keyof RegistrationStep1Data;
        
        setFormData(prev => ({ ...prev, [fieldName]: value }));

        const validator = fieldValidators[fieldName as keyof typeof fieldValidators];
        if (validator) {
            const error = validator(value);
            setErrors(prev => ({ ...prev, [fieldName]: error }));
        }
    };

    const handleCancel = () => {
        setFormData(initialData);
        setErrors({});
    };

    const validateAll = () => {
        const validationErrors = validateUpdateData(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { 
        formData, 
        errors, 
        handleChange, 
        validateAll, 
        handleCancel 
    };
};