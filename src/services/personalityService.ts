import apiService from './api';
import type { Personality, PersonalityForm } from '@/types/api';

export const personalityService = {
    // Criar personalidade
    async createPersonality(personalityData: PersonalityForm): Promise<{ success: boolean; data?: Personality; error?: string }> {
        const response = await apiService.post<Personality>('/personalities', personalityData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao criar personalidade' };
    },

    // Buscar personalidade por ID
    async getPersonalityById(id: number): Promise<{ success: boolean; data?: Personality; error?: string }> {
        const response = await apiService.get<Personality>(`/personalities/${id}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar personalidade' };
    },

    // Buscar personalidade por pet ID
    async getPersonalityByPetId(petId: number): Promise<{ success: boolean; data?: Personality; error?: string }> {
        const response = await apiService.get<Personality>(`/personalities/pet/${petId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar personalidade do pet' };
    },

    // Atualizar personalidade
    async updatePersonality(id: number, personalityData: Partial<PersonalityForm>): Promise<{ success: boolean; data?: Personality; error?: string }> {
        const response = await apiService.put<Personality>(`/personalities/${id}`, personalityData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar personalidade' };
    },

    // Atualizar personalidade por pet ID
    async updatePersonalityByPetId(petId: number, personalityData: Partial<PersonalityForm>): Promise<{ success: boolean; data?: Personality; error?: string }> {
        const response = await apiService.put<Personality>(`/personalities/pet/${petId}`, personalityData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar personalidade do pet' };
    },

    // Deletar personalidade
    async deletePersonality(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/personalities/${id}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao deletar personalidade' };
    }
};
