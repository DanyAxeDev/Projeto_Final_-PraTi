import { Outlet } from "react-router"
import LoggedInHeader from "@/components/LoggedInHeader"

function LoggedInLayout() {
  return (
    <>
        <LoggedInHeader />
        <main className="min-h-screen h-full bg-sand">
            <Outlet />
        </main> 
    </>
  )
}

export default LoggedInLayout
