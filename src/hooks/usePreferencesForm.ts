import { useState } from 'react';
import { validateAdoptionPreferences } from '@/lib/validators';
import type { 
    AdoptionPreferencesData, 
    AnimalType, 
    Gender, 
    Size, 
    Age 
} from '@/lib/validators';

export type PreferencesData = {
    adoption: AdoptionPreferencesData & {
        distance: number;
    };
};

type PreferencesErrorState = {
    adoption?: {
        animalType?: string;
        gender?: string;
        size?: string;
        age?: string;
        personality?: string;
        distance?: string;
    };
};

const initialPreferences: PreferencesData = {
    adoption: {
        animalType: "" as AnimalType,
        gender: "" as Gender,
        size: "" as Size,
        age: "" as Age,
        personality: { 
            'Ativo': false, 
            'Calmo': false, 
            'Se dá bem com outros pets': false, 
            'Se dá bem com crianças': false, 
            'Extrovertido': false, 
            'Introvertido': false 
        },
        distance: 5
    }
};

export const usePreferencesForm = (initialData: PreferencesData = initialPreferences) => {
    const [originalData] = useState(initialData);
    const [draftData, setDraftData] = useState(initialData);
    const [errors, setErrors] = useState<PreferencesErrorState>({});

    const handleChange = (change: { target: { name: string, value: any } }) => {
        const { name, value } = change.target;
        const key = name;
     
        const newDraftData = { ...draftData };
        const newAdoptionState = { ...newDraftData.adoption };

        if (key === 'personality') {
            newAdoptionState.personality = value;
        } else if (key === 'distance') {
            newAdoptionState.distance = Number(value);
        } else {
            (newAdoptionState as any)[key] = value;
        }

        newDraftData.adoption = newAdoptionState;
        setDraftData(newDraftData);        
       
        const validationResult = validateAdoptionPreferences(newAdoptionState as AdoptionPreferencesData);
        setErrors({ adoption: validationResult });
    };

    const validate = () => {
        const validationResult = validateAdoptionPreferences(draftData.adoption as AdoptionPreferencesData);
        const hasErrors = Object.keys(validationResult).length > 0;
        
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