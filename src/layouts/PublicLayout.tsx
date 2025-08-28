import { Outlet } from "react-router"
import PublicHeader from "@/components/PublicHeader"
import Footer from "@/components/Footer"

function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main className="bg-sand min-h-screen h-full pt-20">
        <Outlet />
      </main>

      {/* Imagem das orelhas dos pets */}
      <section className="bg-sand pt-8">
        <div 
        style={{ backgroundImage: "url('/backgrounds/pet-ears.png')" }} 
        className="max-w-[1100px] mx-auto bg-contain bg-bottom bg-no-repeat h-[70px]"
        ></div>
      </section>

      <Footer />
    </>
  )
}

export default PublicLayout
