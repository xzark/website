import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { Hero } from "@/components/landing/hero"
import { Stats } from "@/components/landing/stats"
import { ProductsGrid } from "@/components/landing/products-grid"
import { Features } from "@/components/landing/features"
import { Compliance } from "@/components/landing/compliance"
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
        <Stats />
        <ProductsGrid />
        <Features />
        <Compliance />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
