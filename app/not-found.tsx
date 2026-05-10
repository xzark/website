/**
 * Página 404 customizada.
 * Defensiva: serve também para tentativas de acesso a rotas sensíveis
 * (admin sem auth, paths fictícios), retornando o mesmo conteúdo neutro
 * para não vazar informações sobre a existência de rotas internas.
 */
import Link from "next/link"
import { ArrowLeft, Home, Search } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { GridBackground } from "@/components/site/grid-background"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-border/60">
          <GridBackground />
          <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
                ERR_NOT_FOUND · 404
              </p>
              <h1 className="mt-6 text-balance font-sans text-7xl font-medium leading-[0.95] tracking-tight md:text-9xl">
                <span className="font-serif italic text-primary text-glow">404</span>
              </h1>
              <p className="mt-8 text-balance text-lg leading-relaxed text-muted-foreground md:text-xl">
                A rota requisitada não existe ou o recurso não está disponível neste contexto.
              </p>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                request_id: 7e3a-9c1d-4b82-fa5e
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
                >
                  <Link href="/">
                    <Home className="size-4" />
                    Voltar ao início
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="ghost"
                  className="h-11 rounded-md border border-border/80 bg-transparent px-5 text-sm font-medium hover:bg-accent/40"
                >
                  <Link href="/contact">
                    <Search className="size-4" />
                    Reportar problema
                  </Link>
                </Button>
              </div>

              <Link
                href="javascript:history.back()"
                className="mt-8 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" />
                Página anterior
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
