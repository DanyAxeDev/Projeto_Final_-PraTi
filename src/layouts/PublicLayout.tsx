import { Outlet } from "react-router"
import PublicHeader from "@/components/PublicHeader"

function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main className="bg-gray-200 h-screen">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout
