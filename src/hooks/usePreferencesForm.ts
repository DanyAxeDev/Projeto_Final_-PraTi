import { useState, useEffect } from 'react';
import { validateAdoptionPreferences } from '@/lib/validators';
import type { AdoptionPreferencesData } from '@/lib/validators';
import { userService } from '@/services/userService';
import { useUser } from './useUser';
import { toast } from 'sonner';

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
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useUser();

    // Carregar preferências do usuário atual
    useEffect(() => {
        if (user?.id) {
            loadUserPreferences();
        }
    }, [user?.id]);

    const loadUserPreferences = async () => {
        if (!user?.id) return;

        try {
            const result = await userService.getUserPreferences(user.id);
            if (result.success) {
                if (result.data) {
                    // Usuário tem preferências cadastradas
                    const preferencesData: PreferencesData = {
                        adoption: {
                            species: (result.data.species as any) || '',
                            gender: (result.data.gender as any) || '',
                            size: (result.data.size as any) || '',
                            age: (result.data.age as any) || '',
                            personality: {
                                'Ativo': result.data.active || false,
                                'Calmo': result.data.calm || false,
                                'Extrovertido': result.data.extrovert || false,
                                'Introvertido': result.data.introvert || false,
                                'Se dá bem com outros pets': result.data.goodWithPets || false,
                                'Se dá bem com crianças': result.data.goodWithKids || false
                            },
                            distance: result.data.maxDistance || 5
                        }
                    };
                    setDraftData(preferencesData);
                } else {
                    // Usuário não tem preferências cadastradas, mantém os valores padrão
                    console.log('Usuário não possui preferências cadastradas, usando valores padrão');
                }
            }
        } catch (error) {
            console.error('Erro ao carregar preferências:', error);
        }
    };

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
        // Sempre reseta para os valores iniciais primeiro
        setDraftData(initialPreferences);
        setErrors({});

        // Se o usuário tem preferências cadastradas, recarrega elas
        if (user?.id) {
            loadUserPreferences();
        }
    };

    const savePreferences = async () => {
        if (!user?.id) {
            toast.error("Usuário não encontrado");
            return false;
        }

        if (!validate()) {
            return false;
        }

        setIsLoading(true);
        try {
            const preferencesForm = {
                userId: user.id,
                species: draftData.adoption.species,
                gender: draftData.adoption.gender,
                age: draftData.adoption.age,
                size: draftData.adoption.size,
                active: draftData.adoption.personality['Ativo'],
                goodWithPets: draftData.adoption.personality['Se dá bem com outros pets'],
                calm: draftData.adoption.personality['Calmo'],
                goodWithKids: draftData.adoption.personality['Se dá bem com crianças'],
                extrovert: draftData.adoption.personality['Extrovertido'],
                introvert: draftData.adoption.personality['Introvertido'],
                maxDistance: draftData.adoption.distance
            };

            const result = await userService.savePreferences(preferencesForm);
            if (result.success) {
                toast.success("Preferências salvas com sucesso!");
                return true;
            } else {
                toast.error(result.error || "Erro ao salvar preferências");
                return false;
            }
        } catch (error) {
            toast.error("Erro ao salvar preferências");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        draftData,
        errors,
        isLoading,
        handleChange,
        validate,
        handleCancel,
        savePreferences
    };
};