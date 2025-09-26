import { useState } from 'react';
import { validateAdoptionPreferences } from '@/lib/validators';
import type { AdoptionPreferencesData } from '@/lib/validators';

export type PreferencesData = {
    adoption: AdoptionPreferencesData & {
        distance: number;
    };
};

type PreferencesErrorState = {
    adoption?: Partial<Record<keyof AdoptionPreferencesData, string>>;
};

const initialPreferences: PreferencesData = {
    adoption: {
        species: '',
        gender: '',
        size: '',
        age: '',
        personality: { 
            'Ativo': false, 'Calmo': false, 'Extrovertido': false, 'Introvertido': false,
            'Se dá bem com outros pets': false, 'Se dá bem com crianças': false 
        },
        distance: 5
    }
};

export const usePreferencesForm = (initialData: PreferencesData = initialPreferences) => {
    const [draftData, setDraftData] = useState(initialData);
    const [errors, setErrors] = useState<PreferencesErrorState>({});

    const handleChange = (change: { target: { name: string; value: any } }) => {
        const { name, value } = change.target;
        
        setDraftData(prev => ({
            ...prev,
            adoption: {
                ...prev.adoption,
                [name]: value
            }
        }));

        const fieldName = name as keyof AdoptionPreferencesData;
        if (errors.adoption && errors.adoption[fieldName]) {
            setErrors(prev => {
                const newAdoptionErrors = { ...prev.adoption };
                delete newAdoptionErrors[fieldName];
                return { adoption: newAdoptionErrors };
            });
        }
    };

    const validate = () => {
        const validationResult = validateAdoptionPreferences(draftData.adoption);    
        setErrors({ adoption: validationResult });
        return Object.keys(validationResult).length === 0;
    };

    const handleCancel = () => {
        setDraftData(initialPreferences);
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