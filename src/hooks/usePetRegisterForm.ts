import { useCallback, useState } from 'react';
import { validatePetRegistration } from '@/lib/validators';
import type { PetRegistrationData } from '@/lib/validators';
import { toast } from 'sonner';
import { petService } from '@/services/petService';
import { personalityService } from '@/services/personalityService';
import { uploadImage } from '@/services/imageUploadService';
import type { PetForm, PersonalityForm } from '@/types/api';
import { useUser } from '@/hooks/useUser';

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
    latitude: null,
    longitude: null,
};

// Define o limite de tamanho em bytes (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const usePetRegisterForm = () => {
    const [formData, setFormData] = useState<PetRegistrationData>(initialPetFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof PetRegistrationData, string>>>({});
    const { user } = useUser();

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

    const setPetLocation = useCallback((coords: { lat: number; lng: number } | null) => {
        setFormData(prev => ({
            ...prev,
            latitude: coords?.lat ?? null,
            longitude: coords?.lng ?? null,
        }));
    }, []);

    const validatePetForm = () => {
        const validationErrors = validatePetRegistration(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const registerPet = async (): Promise<{ success: boolean; error?: string }> => {
        if (!user) {
            return { success: false, error: 'Usuário não logado' };
        }

        try {
            // Fazer upload das imagens
            const uploadPromises = [];

            if (formData.castrationReceipt) {
                uploadPromises.push(uploadImage(formData.castrationReceipt));
            }

            if (formData.vaccinationReceipt) {
                uploadPromises.push(uploadImage(formData.vaccinationReceipt));
            }

            if (formData.photo1) {
                uploadPromises.push(uploadImage(formData.photo1));
            }

            if (formData.photo2) {
                uploadPromises.push(uploadImage(formData.photo2));
            }

            if (formData.photo3) {
                uploadPromises.push(uploadImage(formData.photo3));
            }

            // Aguardar upload de todas as imagens
            const uploadedUrls = await Promise.all(uploadPromises);

            // Mapear URLs para os campos corretos
            let castrationReceiptUrl = undefined;
            let vaccinationReceiptUrl = undefined;
            let photo1Url = undefined;
            let photo2Url = undefined;
            let photo3Url = undefined;

            let urlIndex = 0;
            if (formData.castrationReceipt) {
                castrationReceiptUrl = uploadedUrls[urlIndex++];
            }
            if (formData.vaccinationReceipt) {
                vaccinationReceiptUrl = uploadedUrls[urlIndex++];
            }
            if (formData.photo1) {
                photo1Url = uploadedUrls[urlIndex++];
            }
            if (formData.photo2) {
                photo2Url = uploadedUrls[urlIndex++];
            }
            if (formData.photo3) {
                photo3Url = uploadedUrls[urlIndex++];
            }

            // Preparar dados do pet
            const petForm: PetForm = {
                name: formData.name,
                species: formData.species,
                gender: formData.gender,
                birthDate: formData.dob,
                size: formData.size,
                street: formData.petAddress,
                number: parseInt(formData.petNumber) || 0,
                neighborhood: formData.petNeighborhood,
                city: formData.petCity,
                state: formData.petState,
                health: formData.health,
                about: formData.about,
                castrationReceipt: castrationReceiptUrl,
                vaccinationReceipt: vaccinationReceiptUrl,
                photo1: photo1Url,
                photo2: photo2Url,
                photo3: photo3Url,
                ownerId: user.id,
                contactOption: formData.contactOption,
                available: true
            };

            if (formData.latitude !== null && formData.longitude !== null) {
                petForm.latitude = formData.latitude;
                petForm.longitude = formData.longitude;
            }

            const result = await petService.createPet(petForm);

            if (result.success && result.data) {
                // Criar personalidade do pet
                const personalityForm: PersonalityForm = {
                    petId: result.data.id,
                    active: formData.personality.active,
                    goodWithPets: formData.personality.goodWithPets,
                    calm: formData.personality.calm,
                    goodWithKids: formData.personality.goodWithKids,
                    extrovert: formData.personality.extrovert,
                    introvert: formData.personality.introvert
                };

                const personalityResult = await personalityService.createPersonality(personalityForm);

                if (personalityResult.success) {
                    return { success: true };
                } else {
                    // Se falhou ao criar personalidade, mas o pet foi criado, ainda consideramos sucesso
                    console.warn('Pet criado, mas falhou ao criar personalidade:', personalityResult.error);
                    return { success: true };
                }
            }

            return { success: false, error: result.error || 'Erro ao criar pet' };
        } catch (error) {
            console.error('Pet registration error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    };

    return {
        formData,
        errors,
        setErrors, 
        handleChange,
        setPetLocation,
        validatePetForm,
        registerPet
    };
};