import { useUser } from "@/hooks/useUser"
import { Outlet, Navigate } from "react-router"

function PrivateRoute() {
  const { isLoggedIn } = useUser()

  // Se não existir usuário logado, redireciona para o login
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
