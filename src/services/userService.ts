import apiService from './api';
import type { User, UserForm, Preferences, PreferencesForm } from '@/types/api';

export const userService = {
    // Buscar usuário atual (autenticado)
    async getCurrentUser(): Promise<{ success: boolean; data?: User; error?: string }> {
        const response = await apiService.get<User>('/users/me');

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar usuário atual' };
    },

    // Buscar usuário por ID
    async getUserById(id: number): Promise<{ success: boolean; data?: User; error?: string }> {
        const response = await apiService.get<User>(`/users/${id}`);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao buscar usuário' };
    },

    // Atualizar usuário
    async updateUser(id: number, userData: Partial<UserForm>): Promise<{ success: boolean; data?: User; error?: string }> {
        const response = await apiService.put<User>(`/users/${id}`, userData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro ao atualizar usuário' };
    },

    // Buscar preferências do usuário
    async getUserPreferences(userId: number): Promise<{ success: boolean; data?: Preferences; error?: string }> {
        try {
            const response = await apiService.get<Preferences>(`/preferences/user/${userId}`);

            if (response.data) {
                return { success: true, data: response.data };
            }

            // Se não encontrou preferências, retorna sucesso com dados vazios
            if (response.error && response.error.includes('404')) {
                return { success: true, data: undefined };
            }

            return { success: false, error: response.error || 'Erro ao buscar preferências' };
        } catch (error) {
            // Se for erro 404, significa que o usuário não tem preferências ainda
            if (error instanceof Error && error.message.includes('404')) {
                return { success: true, data: undefined };
            }
            return { success: false, error: 'Erro ao buscar preferências' };
        }
    },

    // Criar/atualizar preferências
    async savePreferences(preferencesData: PreferencesForm): Promise<{ success: boolean; data?: Preferences; error?: string }> {
        // Primeiro tenta buscar se já existe
        const existingResponse = await this.getUserPreferences(preferencesData.userId);

        if (existingResponse.success && existingResponse.data && existingResponse.data.id) {
            // Atualiza se já existe - converte PreferencesForm para PreferencesUpdateForm
            const updateData = {
                id: existingResponse.data.id,
                species: preferencesData.species,
                gender: preferencesData.gender,
                age: preferencesData.age,
                size: preferencesData.size,
                active: preferencesData.active,
                goodWithPets: preferencesData.goodWithPets,
                calm: preferencesData.calm,
                goodWithKids: preferencesData.goodWithKids,
                extrovert: preferencesData.extrovert,
                introvert: preferencesData.introvert,
                maxDistance: preferencesData.maxDistance
            };

            const response = await apiService.put<Preferences>(`/preferences/${existingResponse.data.id}`, updateData);

            if (response.data) {
                return { success: true, data: response.data };
            }

            return { success: false, error: response.error || 'Erro ao atualizar preferências' };
        } else {
            // Cria novo se não existe
            const response = await apiService.post<Preferences>('/preferences', preferencesData);

            if (response.data) {
                return { success: true, data: response.data };
            }

            return { success: false, error: response.error || 'Erro ao criar preferências' };
        }
    },

    // Alterar senha do usuário
    async changePassword(id: number, passwordData: { currentPassword: string; newPassword: string }): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.put(`/users/${id}/password`, passwordData);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao alterar senha' };
    },

    // Deletar usuário
    async deleteUser(id: number): Promise<{ success: boolean; error?: string }> {
        const response = await apiService.delete(`/users/${id}`);

        if (!response.error) {
            return { success: true };
        }

        return { success: false, error: response.error || 'Erro ao deletar usuário' };
    }
};
