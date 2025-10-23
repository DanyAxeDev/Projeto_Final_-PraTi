import apiService from './api';
import type { Pet, PetForm, PaginatedResponse } from '@/types/api';

export const petService = {
    // Buscar todos os pets (paginado)
    async getPets(page: number = 0, size: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<Pet>; error?: string }> {
        const response = await apiService.get<PaginatedResponse<Pet>>(`/pets?page=${page}&size=${size}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pets' };
    },

    // Buscar todos os pets (lista completa)
    async getAllPets(): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
        const response = await apiService.get<Pet[]>('/pets/all');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pets' };
    },

    // Buscar pets disponíveis (paginado)
    async getAvailablePets(page: number = 0, size: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<Pet>; error?: string }> {
        const response = await apiService.get<PaginatedResponse<Pet>>(`/pets/available?page=${page}&size=${size}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pets disponíveis' };
    },

    // Buscar pets disponíveis (lista completa)
    async getAvailablePetsList(userId?: number): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
        const url = userId ? `/pets/available/list?userId=${userId}` : '/pets/available/list';
        const response = await apiService.get<Pet[]>(url);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pets disponíveis' };
    },

    // Buscar pet por ID
    async getPetById(id: number): Promise<{ success: boolean; data?: Pet; error?: string }> {
        const response = await apiService.get<Pet>(`/pets/${id}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pet' };
    },

    // Criar novo pet
    async createPet(petData: PetForm): Promise<{ success: boolean; data?: Pet; error?: string }> {
        const response = await apiService.post<Pet>('/pets', petData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao criar pet' };
    },

    // Atualizar pet
    async updatePet(id: number, petData: Partial<PetForm>): Promise<{ success: boolean; data?: Pet; error?: string }> {
        const response = await apiService.put<Pet>(`/pets/${id}`, petData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar pet' };
    },

    // Deletar pet
    async deletePet(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/pets/${id}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao deletar pet' };
    },

    // Marcar pet como adotado (available = false)
    async markAsAdopted(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.patch(`/pets/${id}/availability?available=false`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao marcar pet como adotado' };
    },

    // Buscar pets por usuário (pets do usuário)
    async getPetsByUser(userId: number): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
        const response = await apiService.get<Pet[]>(`/pets/owner/${userId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar pets do usuário' };
    },

    // Buscar pets favoritos do usuário
    async getUserFavorites(userId: number): Promise<{ success: boolean; data?: Pet[]; error?: string }> {
        const response = await apiService.get<Pet[]>(`/pets/favorites/${userId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar favoritos' };
    },

    // Adicionar pet aos favoritos
    async addToFavorites(userId: number, petId: number): Promise<{ success: boolean; error?: string }> {
        const userPetForm = {
            userId: userId,
            petId: petId
        };

        console.log('Enviando dados para adicionar favorito:', userPetForm);

        const response = await apiService.post('/user-pets', userPetForm);

        if (!response.error) {
            return { success: true };
        }

        console.error('Erro ao adicionar favorito:', response.error);
        return { success: false, error: response.error || 'Erro ao adicionar aos favoritos' };
    },

    // Remover pet dos favoritos
    async removeFromFavorites(userId: number, petId: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/user-pets/user/${userId}/pet/${petId}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao remover dos favoritos' };
    }
};
