import { useState } from 'react';
import { validatePetRegistration } from '@/lib/validators';
import type { PetRegistrationData } from '@/lib/validators';
import { toast } from 'sonner';

const initialPetFormData: PetRegistrationData = {
    name: "",
    species: "",
    gender: "" as any,
    size: "" as any,
    dob: "",
    petAddress: "",
    petNumber: "",
    petNeighborhood: "",
    petCity: "",
    petState: "",
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

// Define o limite de tamanho em bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const usePetRegisterForm = () => {
    const [formData, setFormData] = useState<PetRegistrationData>(initialPetFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof PetRegistrationData, string>>>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, type } = event.target;
        let value: string | boolean | File | null;

        if (type === 'checkbox') {
            value = (event.target as HTMLInputElement).checked;
        } else if (type === 'file') {
            const files = (event.target as HTMLInputElement).files;
            const file = files && files.length > 0 ? files[0] : null;

            // Verifica o tamanho do arquivo
            if (file && file.size > MAX_FILE_SIZE) {
                toast.error("O arquivo excede o limite de 10MB.");
                setErrors(prev => ({ ...prev, [name]: "O arquivo excede o limite de 10MB." }));
                event.target.value = ''; 
                return; 
            }
            value = file;       

        } else {
            value = event.target.value;
        }

        const newFormData = { ...formData, [name]: value };
        
        if (name.startsWith('personality-')) {
            const personalityKey = name.replace('personality-', '');
            newFormData.personality = {
                ...formData.personality,
                [personalityKey]: value as boolean,
            };
        }
        
        setFormData(newFormData);

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };
            delete newErrors[name as keyof PetRegistrationData];

            if (type === 'file' && value instanceof File && !value.type.startsWith('image/')) {
                newErrors[name as keyof PetRegistrationData] = "Formato inválido. Apenas imagens.";
            }

            if (name.startsWith('photo')) {
                const photos = [newFormData.photo1, newFormData.photo2, newFormData.photo3];
                const hasAtLeastOnePhoto = photos.some(p => p !== null);
                if (hasAtLeastOnePhoto) {
                    delete newErrors.photo1;
                    delete newErrors.photo2;
                    delete newErrors.photo3;
                }
            }
            
            if (name.startsWith('personality-')) {
                 const isAnyPersonalityChecked = Object.values(newFormData.personality).some(v => v);
                 if (isAnyPersonalityChecked) {
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

    return { 
        formData, 
        errors, 
        handleChange, 
        validatePetForm 
    };
};