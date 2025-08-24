import { Outlet } from "react-router"
import PublicHeader from "@/components/PublicHeader"

function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main className="bg-sand min-h-screen h-full pt-20">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout
