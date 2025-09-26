import { useState } from 'react';
import { 
    validateRegistrationStep1, 
    validateRegistrationStep2 
} from '@/lib/validators';
import type { 
    RegistrationStep1Data, 
    RegistrationStep2Data
} from '@/lib/validators';

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return { 
        formData, 
        errors, 
        handleChange, 
        handleValueChange, 
        handlePersonalityChange,
        validateRegistrationForm, 
        validatePreferenceForm 
    };
};