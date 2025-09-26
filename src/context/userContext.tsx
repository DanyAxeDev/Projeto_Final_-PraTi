import { createContext, useState } from "react"
import type { ReactNode } from "react"

type UserContextValue = {
  user: boolean
}

export const UserContext = createContext<null | UserContextValue>(null)

function UserContextProvider({ children }: {children: ReactNode}) {
  const [user, setUser] = useState(true) // Vai ser null se não existir um user; boolean apenas para testes

  const value = {
    user
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider