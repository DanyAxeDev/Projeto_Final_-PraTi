import type { ApiResponse } from '@/types/api';

const API_BASE_URL = import.meta.env.VITE_API_URL;

class ApiService {
    private baseURL: string;
    private token: string | null = null;

    constructor(baseURL: string = API_BASE_URL) {
        this.baseURL = baseURL;
        this.token = localStorage.getItem('token');
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`;

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...(options.headers as Record<string, string>),
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            if (!response.ok) {
                // O backend retorna string simples, não JSON
                const errorText = await response.text();
                return {
                    error: errorText || `Erro ${response.status}: ${response.statusText}`
                };
            }

            // Para DELETE, a resposta pode ser vazia (204 No Content)
            if (response.status === 204 || response.headers.get('content-length') === '0') {
                return { data: undefined };
            }

            // Verificar se há conteúdo para fazer parse JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                return { data };
            } else {
                // Se não for JSON, retornar texto (apenas para casos específicos)
                const text = await response.text();
                return { data: text as T };
            }
        } catch (error) {
            console.error('API Error:', error);
            return {
                error: error instanceof Error ? error.message : 'Erro de conexão'
            };
        }
    }

    // Métodos GET
    async get<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'GET' });
    }

    // Métodos POST
    async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // Métodos PUT
    async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // Métodos PATCH
    async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
        });
    }

    // Métodos DELETE
    async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }

    // Upload de arquivos
    async uploadFile(endpoint: string, file: File): Promise<ApiResponse<string>> {
        const formData = new FormData();
        formData.append('file', file);

        const headers: Record<string, string> = {};
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData,
            });

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                try {
                    // Tentar extrair mensagem de erro da resposta
                    const errorData = await response.text();
                    if (errorData) {
                        errorMessage = errorData;
                    }
                } catch {
                    // Se não conseguir extrair, usar mensagem padrão
                }

                return { error: errorMessage };
            }

            const data = await response.json();
            return { data };
        } catch (error) {
            console.error('Upload Error:', error);
            return {
                error: error instanceof Error ? error.message : 'Erro no upload'
            };
        }
    }

    // Gerenciamento de token
    setToken(token: string | null) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    getToken(): string | null {
        return this.token;
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    // Verificar se está autenticado
    isAuthenticated(): boolean {
        return !!this.token;
    }
}

// Instância singleton
export const apiService = new ApiService();
export default apiService;
