import apiService from './api';
import type { AdoptionApplication, AdoptionApplicationForm, AdoptionStory, AdoptionStoryForm, PaginatedResponse } from '@/types/api';

export const adoptionService = {
    // ===== ADOPTION APPLICATIONS =====

    // Buscar todas as aplicações de adoção (paginado)
    async getAdoptionApplications(page: number = 0, size: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<AdoptionApplication>; error?: string }> {
        const response = await apiService.get<PaginatedResponse<AdoptionApplication>>(`/adoption-applications?page=${page}&size=${size}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicações de adoção' };
    },

    // Buscar todas as aplicações de adoção (lista completa)
    async getAllAdoptionApplications(): Promise<{ success: boolean; data?: AdoptionApplication[]; error?: string }> {
        const response = await apiService.get<AdoptionApplication[]>('/adoption-applications/all');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicações de adoção' };
    },

    // Buscar aplicações por usuário
    async getAdoptionApplicationsByUser(userId: number): Promise<{ success: boolean; data?: AdoptionApplication[]; error?: string }> {
        const response = await apiService.get<AdoptionApplication[]>(`/adoption-applications/user/${userId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicações do usuário' };
    },

    // Buscar aplicações por pet
    async getAdoptionApplicationsByPet(petId: number): Promise<{ success: boolean; data?: AdoptionApplication[]; error?: string }> {
        const response = await apiService.get<AdoptionApplication[]>(`/adoption-applications/pet/${petId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicações do pet' };
    },

    // Buscar aplicações por dono do pet
    async getAdoptionApplicationsByPetOwner(ownerId: number): Promise<{ success: boolean; data?: AdoptionApplication[]; error?: string }> {
        const response = await apiService.get<AdoptionApplication[]>(`/adoption-applications/pet-owner/${ownerId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicações do dono' };
    },

    // Buscar aplicação por ID
    async getAdoptionApplicationById(id: number): Promise<{ success: boolean; data?: AdoptionApplication; error?: string }> {
        const response = await apiService.get<AdoptionApplication>(`/adoption-applications/${id}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar aplicação' };
    },

    // Criar nova aplicação de adoção
    async createAdoptionApplication(applicationData: AdoptionApplicationForm): Promise<{ success: boolean; data?: AdoptionApplication; error?: string }> {
        const response = await apiService.post<AdoptionApplication>('/adoption-applications', applicationData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao criar aplicação de adoção' };
    },

    // Atualizar aplicação de adoção
    async updateAdoptionApplication(id: number, applicationData: Partial<AdoptionApplicationForm>): Promise<{ success: boolean; data?: AdoptionApplication; error?: string }> {
        const response = await apiService.put<AdoptionApplication>(`/adoption-applications/${id}`, applicationData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar aplicação' };
    },

    // Atualizar status da aplicação
    async updateApplicationStatus(id: number, status: string): Promise<{ success: boolean; data?: AdoptionApplication; error?: string }> {
        const response = await apiService.patch<AdoptionApplication>(`/adoption-applications/${id}/status?status=${status}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar status da aplicação' };
    },

    // Deletar aplicação de adoção
    async deleteAdoptionApplication(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/adoption-applications/${id}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao deletar aplicação' };
    },

    // ===== ADOPTION STORIES =====

    // Buscar todas as histórias de adoção (paginado)
    async getAdoptionStories(page: number = 0, size: number = 10): Promise<{ success: boolean; data?: PaginatedResponse<AdoptionStory>; error?: string }> {
        const response = await apiService.get<PaginatedResponse<AdoptionStory>>(`/adoption-stories?page=${page}&size=${size}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar histórias de adoção' };
    },

    // Buscar todas as histórias de adoção (lista completa)
    async getAllAdoptionStories(): Promise<{ success: boolean; data?: AdoptionStory[]; error?: string }> {
        const response = await apiService.get<AdoptionStory[]>('/adoption-stories/all');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar histórias de adoção' };
    },

    // Buscar histórias aprovadas
    async getApprovedStories(): Promise<{ success: boolean; data?: AdoptionStory[]; error?: string }> {
        const response = await apiService.get<AdoptionStory[]>('/adoption-stories/approved');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar histórias aprovadas' };
    },

    // Buscar histórias aprovadas recentes
    async getRecentApprovedStories(): Promise<{ success: boolean; data?: AdoptionStory[]; error?: string }> {
        const response = await apiService.get<AdoptionStory[]>('/adoption-stories/approved/recent');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar histórias recentes' };
    },

    // Buscar histórias por usuário
    async getAdoptionStoriesByUser(userId: number): Promise<{ success: boolean; data?: AdoptionStory[]; error?: string }> {
        const response = await apiService.get<AdoptionStory[]>(`/adoption-stories/user/${userId}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar histórias do usuário' };
    },

    // Buscar história por ID
    async getAdoptionStoryById(id: number): Promise<{ success: boolean; data?: AdoptionStory; error?: string }> {
        const response = await apiService.get<AdoptionStory>(`/adoption-stories/${id}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar história' };
    },

    // Criar nova história de adoção
    async createAdoptionStory(storyData: AdoptionStoryForm): Promise<{ success: boolean; data?: AdoptionStory; error?: string }> {
        const response = await apiService.post<AdoptionStory>('/adoption-stories', storyData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao criar história de adoção' };
    },

    // Atualizar história de adoção
    async updateAdoptionStory(id: number, storyData: Partial<AdoptionStoryForm>): Promise<{ success: boolean; data?: AdoptionStory; error?: string }> {
        const response = await apiService.put<AdoptionStory>(`/adoption-stories/${id}`, storyData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar história' };
    },

    // Aprovar história
    async approveStory(id: number): Promise<{ success: boolean; data?: AdoptionStory; error?: string }> {
        const response = await apiService.patch<AdoptionStory>(`/adoption-stories/${id}/approve`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao aprovar história' };
    },

    // Rejeitar história
    async rejectStory(id: number): Promise<{ success: boolean; data?: AdoptionStory; error?: string }> {
        const response = await apiService.patch<AdoptionStory>(`/adoption-stories/${id}/reject`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao rejeitar história' };
    },

    // Deletar história de adoção
    async deleteAdoptionStory(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/adoption-stories/${id}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao deletar história' };
    }
};
