import { useState } from 'react';
import { validateName, validateEmail, validatePhone, validateRequiredField } from '@/lib/validators';

// Campos do estado inicial
const initialUserData = {
    nome: "Nome",
    sobrenome: "Sobrenome",
    telefone: "(99) 99999-9999",
    email: "usuario@email.com",
    endereco: "Rua Exemplo",
    numero: "123",
    bairro: "Bairro",
    cidade: "Minha Cidade",
    estado: "Meu Estado",
};

export const useUpdateDataForm = () => {
    const [formData, setFormData] = useState(initialUserData);
    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>({});   

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        let finalValue = value;
        if (id === 'nome' || id === 'sobrenome') {
            finalValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
        }

        if (id === 'telefone' || id === 'numero') {
            finalValue = value.replace(/\D/g, '');
        }

        setFormData(prev => ({ ...prev, [id]: finalValue }));

        let error: string | undefined;
        switch (id) {
            case 'nome':
                error = validateName(finalValue, "Nome");
                break;
            case 'sobrenome':
                error = validateName(finalValue, "Sobrenome");
                break;
            case 'email':
                error = validateEmail(finalValue);
                break;
            case 'telefone':
                error = validatePhone(finalValue);
                break;

            case 'endereco':
                error = validateRequiredField(finalValue, "Endereço");
                break;
            case 'numero':
                error = validateRequiredField(finalValue, "Número");
                break;
            case 'bairro':
                error = validateRequiredField(finalValue, "Bairro");
                break;
            case 'cidade':
                error = validateRequiredField(finalValue, "Cidade");
                break;
            case 'estado':
                error = validateRequiredField(finalValue, "Estado");
                break;
            default:
                break;
        }
        setErrors(prev => ({ ...prev, [id]: error }));
    };

    const validateAll = () => {
        const validationErrors: { [key: string]: string | undefined } = {
            nome: validateName(formData.nome, "Nome"),
            sobrenome: validateName(formData.sobrenome, "Sobrenome"),
            email: validateEmail(formData.email),
            telefone: validatePhone(formData.telefone),
            endereco: validateRequiredField(formData.endereco, "Endereço"),
            numero: validateRequiredField(formData.numero, "Número"),
            bairro: validateRequiredField(formData.bairro, "Bairro"),
            cidade: validateRequiredField(formData.cidade, "Cidade"),
            estado: validateRequiredField(formData.estado, "Estado"),
        };

        const validErrors = Object.entries(validationErrors).reduce((acc, [key, value]) => {
            if (value) {
                acc[key] = value;
            }
            return acc;
        }, {} as { [key: string]: string });

        setErrors(validErrors);
        return Object.keys(validErrors).length === 0;
    };

    return { formData, errors, handleChange, validateAll, setFormData };
};