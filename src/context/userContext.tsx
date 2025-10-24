import { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react"
import type { User } from "@/types/api"
import { authService } from "@/services/authService"
import { userService } from "@/services/userService"
import { oauth2Service } from "@/services/oauth2Service"
import apiService from "@/services/api"

type UserContextValue = {
  user: User | null
  isLoading: boolean
  isLoggedIn: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithGitHub: () => void
  logout: () => void
  updateUser: (userData: Partial<User>) => void
}

export const UserContext = createContext<null | UserContextValue>(null)

function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Verificar se há token válido no localStorage ao inicializar
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Verificar se há token na URL (callback OAuth2)
      const urlParams = new URLSearchParams(window.location.search)
      const tokenFromUrl = urlParams.get('token')
      const tokenType = urlParams.get('type')
      const errorFromUrl = urlParams.get('error')

      if (errorFromUrl === 'oauth2_failed') {
        console.error('Erro no OAuth2:', errorFromUrl)
        // Limpar a URL
        window.history.replaceState({}, document.title, window.location.pathname)
        setIsLoading(false)
        return
      }

      if (tokenFromUrl && tokenType) {
        try {
          // Salvar o token e buscar dados do usuário
          apiService.setToken(tokenFromUrl)
          const userResult = await userService.getCurrentUser()
          if (userResult.success && userResult.data) {
            setUser(userResult.data)
            setIsLoggedIn(true)
          }
          // Limpar a URL para remover parâmetros OAuth2
          window.history.replaceState({}, document.title, window.location.pathname)
          setIsLoading(false)
          return
        } catch (error) {
          console.error('Erro no callback OAuth2:', error)
          // Limpar a URL mesmo em caso de erro
          window.history.replaceState({}, document.title, window.location.pathname)
        }
      }

      const token = authService.getToken()
      if (token) {
        try {
          // Verificar se o token é válido fazendo uma chamada para buscar dados do usuário
          const result = await userService.getCurrentUser()
          if (result.success && result.data) {
            setUser(result.data)
            setIsLoggedIn(true)
          } else {
            // Token inválido, limpar
            authService.logout()
            setIsLoggedIn(false)
          }
        } catch (error) {
          // Erro na verificação, limpar token
          authService.logout()
          setIsLoggedIn(false)
        }
      } else {
        setIsLoggedIn(false)
      }
      setIsLoading(false)
    }

    checkAuthStatus()
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const result = await authService.login({ email, password })

      if (result.success && result.data) {
        // Login bem-sucedido - definir como logado imediatamente
        setIsLoggedIn(true)

        // Buscar dados do usuário de forma assíncrona
        userService.getCurrentUser()
          .then(userResult => {
            if (userResult.success && userResult.data) {
              setUser(userResult.data)
            } else {
              console.warn('Não foi possível buscar dados do usuário após login:', userResult.error)
              // Mesmo sem dados completos, mantém o login ativo
            }
          })
          .catch(error => {
            console.error('Erro ao buscar dados do usuário após login:', error)
            // Mesmo com erro, mantém o login ativo
          })

        return { success: true }
      }

      return { success: false, error: result.error }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      }
    }
  }

  const loginWithGitHub = () => {
    oauth2Service.initiateGitHubLogin()
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setIsLoggedIn(false)
  }

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData })
    }
  }

  const value = {
    user,
    isLoading,
    isLoggedIn,
    login,
    loginWithGitHub,
    logout,
    updateUser
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider