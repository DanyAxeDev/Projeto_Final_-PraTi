import { useState, useEffect } from 'react';
import { petService } from '@/services/petService';
import { useUser } from '@/hooks/useUser';
import type { Pet } from '@/types/api';

export const useMyPets = () => {
    const [pets, setPets] = useState<Pet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUser();

    const fetchMyPets = async () => {
        if (!user) {
            setError('Usuário não logado');
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const result = await petService.getPetsByUser(user.id);

            if (result.success && result.data) {
                setPets(result.data);
            } else {
                setError(result.error || 'Erro ao buscar pets');
            }
        } catch (err) {
            console.error('Erro ao buscar pets:', err);
            setError('Erro inesperado ao buscar pets');
        } finally {
            setLoading(false);
        }
    };

    const deletePet = async (petId: number): Promise<{ success: boolean; error?: string }> => {
        try {
            const result = await petService.deletePet(petId);

            if (result.success) {
                // Remove o pet da lista local
                setPets(prevPets => prevPets.filter(pet => pet.id !== petId));
                return { success: true };
            }

            return { success: false, error: result.error || 'Erro ao deletar pet' };
        } catch (err) {
            console.error('Erro ao deletar pet:', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Erro inesperado ao deletar pet'
            };
        }
    };

    const updatePetAvailability = async (petId: number, available: boolean): Promise<{ success: boolean; error?: string }> => {
        try {
            const result = await petService.updatePet(petId, { available });

            if (result.success) {
                // Atualiza o pet na lista local
                setPets(prevPets =>
                    prevPets.map(pet =>
                        pet.id === petId ? { ...pet, available } : pet
                    )
                );
                return { success: true };
            }

            return { success: false, error: result.error || 'Erro ao atualizar disponibilidade' };
        } catch (err) {
            console.error('Erro ao atualizar disponibilidade:', err);
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Erro inesperado ao atualizar disponibilidade'
            };
        }
    };

    useEffect(() => {
        fetchMyPets();
    }, [user]);

    return {
        pets,
        loading,
        error,
        refetch: fetchMyPets,
        deletePet,
        updatePetAvailability
    };
};
