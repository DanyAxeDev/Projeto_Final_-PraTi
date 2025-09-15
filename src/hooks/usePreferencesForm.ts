import { useState } from 'react';
import { validateAdoptionPreferences } from '@/lib/validators';

export type PreferencesData = {
    adoption: {
        animalTypes: string;
        sexo: string;
        porte: string;
        idade: string;
        personalidade: { [key: string]: boolean };
        distancia: number;
    };
};

type PreferencesErrorState = {
    adoption?: {
        animalTypes?: string;
        sexo?: string;
        porte?: string;
        idade?: string;
        personalidade?: string;
    }
}

// Campos do estado inicial
const initialPreferences: PreferencesData = {
    adoption: {
        animalTypes: "Não tenho preferência",
        sexo: "Não tenho preferência", 
        porte: "Não tenho preferência", 
        idade: "Não tenho preferência",
        personalidade: { 'Se dá bem com outros pets': true, 'Se dá bem com crianças': true },
        distancia: 5
    }
};

export const usePreferencesForm = (initialData: PreferencesData = initialPreferences) => {
    const [originalData] = useState(initialData);
    const [draftData, setDraftData] = useState(initialData);
    const [errors, setErrors] = useState<PreferencesErrorState>({});

    const handleChange = (change: { target: { name: string, value: any } }) => {
        const { name, value } = change.target;
        
        setDraftData(prev => {
            const newAdoptionState = { ...prev.adoption };

            if (name === 'personalidade') {
                newAdoptionState.personalidade = value;
            } else if (name === 'distancia') {
                newAdoptionState.distancia = Number(value);
            } else {                
                (newAdoptionState as any)[name] = value;
            }
            
            return { ...prev, adoption: newAdoptionState };
        });
    };

    const validate = () => {
        // Usa a função de validação externa
        const validationResult = validateAdoptionPreferences(draftData.adoption);
        const hasErrors = Object.values(validationResult).some(errorMsg => errorMsg !== "");
        
        if (hasErrors) {        
            setErrors({ adoption: validationResult });
            return false;
        }
     
        setErrors({});
        return true;
    };

    const handleCancel = () => {
        setDraftData(originalData);
        setErrors({});
    };

    return {
        draftData,
        errors,
        handleChange,
        validate,
        handleCancel
    };
};