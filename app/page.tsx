import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/landing/hero"
import { ProductsGrid } from "@/components/landing/products-grid"
import { Features } from "@/components/landing/features"
import { CTA } from "@/components/landing/cta"

/**
 * Landing page xZark
 * Composição: anúncios, header, hero editorial, métricas, produtos,
 * features técnicos, compliance e CTA final.
 */
export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <ProductsGrid />
        <Features />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
