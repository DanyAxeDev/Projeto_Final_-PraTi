import { Outlet } from "react-router"
import LoggedInHeader from "@/components/LoggedInHeader"

function LoggedInLayout() {
  return (
    <>
        <LoggedInHeader />
        <main className="h-screen">
            <Outlet />
        </main> 
    </>
  )
}

export default LoggedInLayout
