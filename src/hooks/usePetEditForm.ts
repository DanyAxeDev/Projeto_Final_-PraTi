import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
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

export const usePetEditForm = () => {
    const [formData, setFormData] = useState<PetRegistrationData>(initialPetFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof PetRegistrationData, string>>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { id } = useParams();
    const { user } = useUser();

    // Carregar dados do pet
    useEffect(() => {
        const loadPetData = async () => {
            if (!id || !user) {
                setError('ID do pet ou usuário não encontrado');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);

                // Buscar dados do pet
                const petResult = await petService.getPetById(Number(id));

                if (petResult.success && petResult.data) {
                    const pet = petResult.data;

                    // Mapear dados do pet para o formulário
                    const petFormData: PetRegistrationData = {
                        name: pet.name,
                        species: pet.species,
                        gender: pet.gender as any,
                        size: pet.size as any,
                        dob: pet.birthDate,
                        petAddress: pet.street,
                        petNumber: pet.number.toString(),
                        petNeighborhood: pet.neighborhood,
                        petCity: pet.city,
                        petState: pet.state,
                        health: pet.health || "",
                        about: pet.about || "",
                        castrationReceipt: null, // Arquivos não são carregados
                        vaccinationReceipt: null,
                        photo1: null,
                        photo2: null,
                        photo3: null,
                        contactOption: pet.contactOption || "",
                        personality: {
                            active: pet.active || false,
                            goodWithPets: pet.goodWithPets || false,
                            calm: pet.calm || false,
                            goodWithKids: pet.goodWithKids || false,
                            extrovert: pet.extrovert || false,
                            introvert: pet.introvert || false,
                        },
                        latitude: null,
                        longitude: null,
                    };

                    setFormData(petFormData);
                } else {
                    setError(petResult.error || 'Erro ao carregar dados do pet');
                }
            } catch (err) {
                console.error('Erro ao carregar pet:', err);
                setError('Erro inesperado ao carregar dados do pet');
            } finally {
                setLoading(false);
            }
        };

        loadPetData();
    }, [id, user]);

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

        // Remove erros de arquivos
        delete validationErrors.castrationReceipt;
        delete validationErrors.vaccinationReceipt;
        delete validationErrors.photo1;
        delete validationErrors.photo2;
        delete validationErrors.photo3;

        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const updatePet = async (): Promise<{ success: boolean; error?: string }> => {
        if (!user || !id) {
            return { success: false, error: 'Usuário não logado ou ID do pet não encontrado' };
        }

        try {
            // Fazer upload das novas imagens (se houver)
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

            // Preparar dados do pet para atualização
            const petUpdateData: Partial<PetForm> & { id: number } = {
                id: Number(id), // Incluir o ID do pet
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
                contactOption: formData.contactOption,
                available: true
            };

            // Adicionar URLs apenas se houver novos arquivos
            if (castrationReceiptUrl) petUpdateData.castrationReceipt = castrationReceiptUrl;
            if (vaccinationReceiptUrl) petUpdateData.vaccinationReceipt = vaccinationReceiptUrl;
            if (photo1Url) petUpdateData.photo1 = photo1Url;
            if (photo2Url) petUpdateData.photo2 = photo2Url;
            if (photo3Url) petUpdateData.photo3 = photo3Url;

            const result = await petService.updatePet(Number(id), petUpdateData);

            if (result.success && result.data) {
                // Atualizar personalidade
                const personalityForm: PersonalityForm = {
                    petId: result.data.id,
                    active: formData.personality.active,
                    goodWithPets: formData.personality.goodWithPets,
                    calm: formData.personality.calm,
                    goodWithKids: formData.personality.goodWithKids,
                    extrovert: formData.personality.extrovert,
                    introvert: formData.personality.introvert
                };

                const personalityResult = await personalityService.updatePersonalityByPetId(Number(id), personalityForm);

                if (personalityResult.success) {
                    return { success: true };
                } else {
                    // Se falhou ao atualizar personalidade, mas o pet foi atualizado, ainda consideramos sucesso
                    console.warn('Pet atualizado, mas falhou ao atualizar personalidade:', personalityResult.error);
                    return { success: true };
                }
            }

            return { success: false, error: result.error || 'Erro ao atualizar pet' };
        } catch (error) {
            console.error('Pet update error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    };

    return {
        formData,
        errors,
        loading,
        error,
        handleChange,
        validatePetForm,
        updatePet,
        setErrors,
        setFormData
    };
};
