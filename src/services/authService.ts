import apiService from './api';
import type { LoginForm, UserForm, Token, User } from '@/types/api';

export const authService = {
    // Login
    async login(credentials: LoginForm): Promise<{ success: boolean; data?: Token; error?: string }> {
        const response = await apiService.post<Token>('/auth', credentials);

        if (response.data) {
            apiService.setToken(response.data.token);
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro no login' };
    },

    // Registro de usuário
    async register(userData: UserForm): Promise<{ success: boolean; data?: User; error?: string }> {
        const response = await apiService.post<User>('/users', userData);

        if (response.data) {
            return { success: true, data: response.data };
        }

        return { success: false, error: response.error || 'Erro no registro' };
    },

    // Logout
    logout(): void {
        apiService.clearToken();
    },

    // Verificar se está autenticado
    isAuthenticated(): boolean {
        return apiService.isAuthenticated();
    },

    // Obter token atual
    getToken(): string | null {
        return apiService.getToken();
    }
};
