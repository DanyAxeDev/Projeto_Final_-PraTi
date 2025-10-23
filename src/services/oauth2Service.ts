import type { ApiResponse, Token } from '@/types/api';

const API_BASE_URL = 'http://localhost:8080';

export const oauth2Service = {
    /**
     * Inicia o processo de login com GitHub
     * Redireciona o usuário para o endpoint OAuth2 do backend
     */
    initiateGitHubLogin(): void {
        const githubAuthUrl = `${API_BASE_URL}/oauth2/authorization/github`;
        window.location.href = githubAuthUrl;
    },

    /**
     * Verifica se há um token de retorno do OAuth2 na URL
     * Usado quando o usuário retorna do GitHub
     */
    checkOAuth2Callback(): boolean {
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;

        // Verificar se estamos retornando do OAuth2
        if (urlParams.get('code') || hash.includes('token')) {
            return true;
        }

        return false;
    },

    /**
     * Processa o callback do OAuth2 e extrai o token
     * Este método deve ser chamado quando o usuário retorna do GitHub
     */
    async processOAuth2Callback(): Promise<{ success: boolean; data?: Token; error?: string }> {
        try {
            // Fazer uma requisição para o endpoint de sucesso do OAuth2
            const response = await fetch(`${API_BASE_URL}/auth/oauth2/success`, {
                method: 'GET',
                credentials: 'include', // Importante para incluir cookies de sessão
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                return {
                    success: false,
                    error: errorText || 'Erro na autenticação OAuth2'
                };
            }

            const data: Token = await response.json();
            return { success: true, data };

        } catch (error) {
            console.error('Erro no callback OAuth2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    },

    /**
     * Obtém informações do usuário autenticado via OAuth2
     */
    async getOAuth2User(): Promise<{ success: boolean; data?: any; error?: string }> {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/oauth2/user`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                return {
                    success: false,
                    error: errorText || 'Erro ao obter dados do usuário'
                };
            }

            const data = await response.json();
            return { success: true, data };

        } catch (error) {
            console.error('Erro ao obter usuário OAuth2:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Erro desconhecido'
            };
        }
    }
};
