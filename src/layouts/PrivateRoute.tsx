import { useUser } from "@/hooks/useUser"
import { Outlet, Navigate } from "react-router"

function PrivateRoute() {
  const { user } = useUser()

  // Se não existir usuário logado, redireciona para o login
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
