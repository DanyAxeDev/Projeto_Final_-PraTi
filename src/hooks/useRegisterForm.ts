import { useState } from 'react';
import {
    validateRegistrationStep1,
    validatePetRegistration,
    validateBirthDate,
    validateEmail,
    validateName,
    validatePassword,
    validateConfirmPassword,
} from '@/lib/validators';

import type {
    PetRegistrationData,
    RegistrationStep1Data,
    Gender,
    Age,
    Size,
} from '@/lib/validators';

type FullFormData = RegistrationStep1Data & PetRegistrationData & {
    personality: {
        active: boolean; goodWithPets: boolean; calm: boolean; goodWithKids: boolean;
        extrovert: boolean; introvert: boolean;
    };
    maxDistance: number;
};

// Dados iniciais do formulário
const initialFormData: FullFormData = {
    firstName: "", lastName: "", birthDate: "", phone: "", address: "",
    number: "", neighborhood: "", city: "", state: "", email: "",
    password: "", confirmPassword: "",
    species: "", gender: "" as Gender, age: "" as Age, size: "" as Size,
    personality: {
        active: false, goodWithPets: false, calm: false, goodWithKids: false,
        extrovert: false, introvert: false,
    },
    maxDistance: 5,
};

export const useRegisterForm = () => {
    const [formData, setFormData] = useState<FullFormData>(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: any }>({});
  
    const handleChange = (eventOrValue: any) => {
        let name: string;
        let value: any;

        if (eventOrValue && eventOrValue.target) {        
            const { id, name: targetName, value: targetValue, type, checked } = eventOrValue.target;
            name = targetName || id;
            value = (type === 'checkbox' || type === 'radio') ? checked : targetValue;

            if (eventOrValue.target.name === 'species' || eventOrValue.target.name === 'gender' || eventOrValue.target.name === 'age' || eventOrValue.target.name === 'size') {
                name = eventOrValue.target.name;
                value = eventOrValue.target.value;
            }
        } else if (Array.isArray(eventOrValue)) {
            name = 'maxDistance';
            value = eventOrValue[0];
        } else {         
            name = eventOrValue.name;
            value = eventOrValue.value;
        }
      
        if (name === 'maxDistance') {
            setFormData(prev => ({
                ...prev,
                [name]: Number(value),
            }));
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.maxDistance; 
                return newErrors;
            });
            return;
        }
        let finalValue = value;
        if (name === 'firstName' || name === 'lastName') {
            finalValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
        }
        if (name === 'phone') {
            finalValue = value.replace(/\D/g, '');
        }

        // Atualiza o estado do formulário
        setFormData(prev => {
            if (name.startsWith('personality')) {
                const personalityKey = name.replace('personality-', '');
                const isChecked = typeof value === 'boolean' ? value : false;
                return {
                    ...prev,
                    personality: { ...prev.personality, [personalityKey]: isChecked }
                };
            }
            return { ...prev, [name]: finalValue };
        });
    
        setErrors(prev => {
            const newErrors = { ...prev };
            
            if (name.startsWith('personality-')) {
                const personalityKey = name.replace('personality-', '');
                const updatedPersonality = { ...formData.personality, [personalityKey]: typeof value === 'boolean' ? value : false };
                const isAnyPersonalityChecked = Object.values(updatedPersonality).some(val => val === true);
                
                if (!isAnyPersonalityChecked) {
                    newErrors.personality = "Selecione ao menos uma característica de personalidade.";
                } else {
                    delete newErrors.personality;
                }
                return newErrors;
            }            
     
            delete newErrors[name];
            if (finalValue.trim() !== '') {
                let error: string | undefined;
                switch (name) {
                    case 'firstName': error = validateName(finalValue, "Nome"); break;
                    case 'lastName': error = validateName(finalValue, "Sobrenome"); break;
                    case 'birthDate': error = validateBirthDate(finalValue); break;
                    case 'email': error = validateEmail(finalValue); break;
                    case 'password': error = validatePassword(finalValue); break;
                    case 'confirmPassword': error = validateConfirmPassword(formData.password, finalValue); break;                  
                }
                if (error) {
                    newErrors[name] = error;
                }
            }
            
            // Lógica para sincronizar senha e confirmação
            if (name === 'password' || name === 'confirmPassword') {
                const confirmError = validateConfirmPassword(
                    name === 'password' ? finalValue : formData.password,
                    name === 'confirmPassword' ? finalValue : formData.confirmPassword
                );
                if (confirmError) {
                    newErrors.confirmPassword = confirmError;
                } else {
                    delete newErrors.confirmPassword;
                }
            }

            return newErrors;
        });
    };

    const validateStep1 = () => {
        const step1Data = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthDate: formData.birthDate,
            phone: formData.phone,
            address: formData.address,
            number: formData.number,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword
        };
        const validationErrors = validateRegistrationStep1(step1Data);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const validateStep2 = () => {
        const petData: PetRegistrationData = {
            species: formData.species,
            gender: formData.gender,
            age: formData.age,
            size: formData.size,
            personality: formData.personality,
        };
        const validationErrors = validatePetRegistration(petData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, errors, handleChange, validateStep1, validateStep2 };
};