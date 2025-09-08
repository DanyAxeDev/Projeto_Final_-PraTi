import HeadingWithLine from "@/components/HeadingWithLine"
import type { ReactNode } from "react"

type PageWithHeaderLayoutProps = {
  title: string
  children: ReactNode
}

// Layout para páginas que possuem a header marrom (utilizar como wrapper dos elementos da página)
function PageWithHeaderLayout({ title, children }: PageWithHeaderLayoutProps) {
  return (
    <>
      <header className="bg-brown py-12 px-8 text-center bg-center bg-no-repeat bg-cover sm:py-16" style={{ backgroundImage: "url('/backgrounds/curve.svg')" }}>
        <HeadingWithLine text={title} color="sand" />
      </header>
      {children}
    </>
  )
}

export default PageWithHeaderLayout
