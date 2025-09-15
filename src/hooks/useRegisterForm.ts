import { useState } from 'react';
import {
    validateRegistrationStep1,
    validatePetRegistration,
    validateBirthDate,
    validatePetBirthDate,
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

type PetFormFields = PetRegistrationData;

type FullFormData = RegistrationStep1Data & PetFormFields & {
    maxDistance: number;
};

const initialFormData: FullFormData = {
    firstName: "", lastName: "", birthDate: "", phone: "", address: "",
    number: "", neighborhood: "", city: "", state: "", email: "",
    password: "", confirmPassword: "",
    name: "",
    species: "",
    gender: "" as Gender,
    age: "" as Age,
    size: "" as Size,
    dob: "",
    petAddress: "",
    health: "",
    about: "",
    castrationReceipt: null,
    vaccinationReceipt: null,
    photo1: null,
    photo2: null, 
    photo3: null,
    contactOption: "",
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
            const { id, name: targetName, value: targetValue, type, checked, files } = eventOrValue.target;
            name = targetName || id;

            if (type === 'checkbox') {
                value = checked;
            } else if (type === 'file') {
                value = files && files.length > 0 ? files[0] : null;
            } else {
                value = targetValue;
            }
        } else if (Array.isArray(eventOrValue)) {
            name = 'maxDistance';
            value = eventOrValue[0];
        } else {
            name = eventOrValue.name;
            value = eventOrValue.value;
        }

        let finalValue = value;
        if (name === 'firstName' || name === 'lastName') {
            finalValue = value.replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s]/g, '');
        }
        if (name === 'phone') {
            finalValue = value.replace(/\D/g, '');
        }

        setFormData(prev => {
            if (name.startsWith('personality-')) {
                const personalityKey = name.replace('personality-', '');
                return {
                    ...prev,
                    personality: { ...prev.personality, [personalityKey]: value }
                };
            }
            return { ...prev, [name]: finalValue };
        });

        setErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[name];
            
            if (name.startsWith('personality-')) {
                const personalityKey = name.replace('personality-', '');
                const updatedPersonality = { ...formData.personality, [personalityKey]: value };
                const isAnyChecked = Object.values(updatedPersonality).some(isChecked => isChecked === true);

                if (isAnyChecked) {
                    delete newErrors.personality;
                }
            }            

            let error: string | undefined;
            switch (name) {
                case 'firstName':
                    error = validateName(finalValue, "Nome");
                    break;
                case 'lastName':
                    error = validateName(finalValue, "Sobrenome");
                    break;
                case 'email':
                    error = validateEmail(finalValue);
                    break;
                case 'birthDate':
                    error = validateBirthDate(finalValue);
                    break;
                case 'password':
                    error = validatePassword(finalValue);
                    break;
                case 'confirmPassword':
                    error = validateConfirmPassword(formData.password, finalValue);
                    break;           
                 case 'dob': 
                error = validatePetBirthDate(value);
            }

            if (error) {
                newErrors[name] = error;
            }
            
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

    const validateRegistrationForm = () => {
        const step1Data: RegistrationStep1Data = {
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

    const validatePetForm = () => {
        const petData: PetRegistrationData = {
            name: formData.name,
            species: formData.species,
            gender: formData.gender,
            size: formData.size,
            dob: formData.dob,
            petAddress: formData.petAddress,
            health: formData.health,
            about: formData.about,
            castrationReceipt: formData.castrationReceipt,
            vaccinationReceipt: formData.vaccinationReceipt,
            contactOption: formData.contactOption,
            photo1: formData.photo1,
            photo2: formData.photo2,
            photo3: formData.photo3,
            personality: formData.personality,
            age: '' as Age,
        };
        const validationErrors = validatePetRegistration(petData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, errors, handleChange, validateRegistrationForm, validatePetForm };
};