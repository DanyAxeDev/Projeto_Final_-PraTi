import { useState } from 'react';
import {
    validatePetRegistration,
    validateName,
    validatePetBirthDate,
    validateRequiredField,
    validateFile
} from '@/lib/validators';
import type { PetRegistrationData, Gender, Size } from '@/lib/validators';

const initialPetFormData: PetRegistrationData = {
    name: "",
    species: "",
    gender: "" as Gender,
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
};

export const usePetRegisterForm = () => {
    const [formData, setFormData] = useState<PetRegistrationData>(initialPetFormData);
    const [errors, setErrors] = useState<{ [key: string]: any }>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type } = event.target;
        let value: any;

        if (type === 'checkbox') {
            value = (event.target as HTMLInputElement).checked;
        } else if (type === 'file') {
            const files = (event.target as HTMLInputElement).files;
            value = files && files.length > 0 ? files[0] : null;
        } else {
            value = event.target.value;
        }
       
        const newFormData = { ...formData };
        if (name.startsWith('personality-')) {
            const personalityKey = name.replace('personality-', '') as keyof typeof newFormData.personality;
            newFormData.personality[personalityKey] = value;
        } else {
            (newFormData as any)[name] = value;
        }
        setFormData(newFormData);
     
        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            let error: string | undefined;

            switch (name) {
                case 'name':
                    error = validateName(value, "Nome do pet");
                    break;
                case 'dob':
                    error = validatePetBirthDate(value);
                    break;
                case 'petAddress':
                    error = validateRequiredField(value, "Localização");
                    break;
                case 'health':
                    error = validateRequiredField(value, "Descrição de saúde");
                    break;
                case 'about':
                    error = validateRequiredField(value, "História do pet");
                    break;
                case 'castrationReceipt':
                    error = validateFile(value, "Comprovante de castração");
                    break;
                case 'vaccinationReceipt':
                    error = validateFile(value, "Comprovante de vacinação");
                    break;
                case 'species':
                    if (!value) error = "Por favor, selecione uma espécie.";
                    break;
                case 'gender':
                    if (!value) error = "Por favor, selecione um gênero.";
                    break;
                case 'size':
                    if (!value) error = "Por favor, selecione um porte.";
                    break;
                case 'contactOption':
                    if (!value) error = "Por favor, escolha uma forma de contato.";
                    break;
            }

            if (error) {
                (newErrors as any)[name] = error;
            } else {
                delete (newErrors as any)[name];
            }
    
            if (name.startsWith('photo') && (newFormData.photo1 || newFormData.photo2 || newFormData.photo3)) {
                delete newErrors.photos;
            }
            if (name.startsWith('personality-')) {
                const isAnyChecked = Object.values(newFormData.personality).some(v => v === true);
                if (isAnyChecked) {
                    delete newErrors.personality;
                }
            }
            
            return newErrors;
        });
    };

    const validatePetForm = () => {
        const validationErrors = validatePetRegistration(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    return { formData, errors, handleChange, validatePetForm };
};