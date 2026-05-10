import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { CTA } from "@/components/landing/cta"
import { products } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Catálogo completo de produtos xZark: xAuth, xShield, xVault, xCloud e xGate. Infraestrutura zero-trust modular.",
}

/**
 * Página de listagem de produtos
 * Lista todos os 5 produtos com cards detalhados e métricas.
 */
export default function ProductsPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Plataforma · 5 produtos"
          title={
            <>
              Pilha de segurança <span className="font-serif italic text-primary">unificada</span>.
            </>
          }
          description="Cada produto é desenhado para resolver uma camada da pilha de segurança e privacidade. Combine-os ou use isoladamente — todos compartilham a mesma plataforma de auditoria, identidade e telemetria."
        />

        <section className="border-b border-border/60 bg-background py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3">
              {products.map((p, idx) => {
                const Icon = p.icon
                return (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    className="group relative overflow-hidden rounded-xl border border-border/80 bg-card p-6 transition-colors hover:border-primary/40 md:p-8"
                  >
                    <div className="flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-8">
                      {/* Coluna esquerda: número + ícone */}
                      <div className="flex items-center justify-between md:col-span-2 md:flex-col md:items-start md:justify-start md:gap-6">
                        <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                          0{idx + 1} / {products.length.toString().padStart(2, "0")}
                        </span>
                        <div className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-background/60">
                          <Icon className="size-4 text-primary" />
                        </div>
                      </div>

                      {/* Centro: nome + tagline + descrição */}
                      <div className="md:col-span-6">
                        <div className="flex items-baseline gap-3">
                          <h2 className="text-2xl font-medium tracking-tight md:text-3xl">
                            {p.name}
                          </h2>
                          <span
                            className={
                              "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] " +
                              (p.status === "GA"
                                ? "border-success/30 bg-success/10 text-success"
                                : p.status === "Beta"
                                  ? "border-primary/30 bg-primary/10 text-primary"
                                  : "border-border bg-muted text-muted-foreground")
                            }
                          >
                            {p.status}
                          </span>
                        </div>
                        <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                          {p.category}
                        </p>
                        <p className="mt-4 text-pretty text-base text-foreground/90">
                          {p.tagline}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {p.description}
                        </p>
                      </div>

                      {/* Direita: métricas */}
                      <div className="md:col-span-4">
                        <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
                          {p.metrics.map((m) => (
                            <div key={m.label} className="border-l border-border/60 pl-4">
                              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                                {m.label}
                              </p>
                              <p className="mt-1 font-sans text-base tabular-nums">
                                {m.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 inline-flex items-center gap-1 text-sm text-foreground transition-colors group-hover:text-primary">
                          Ver detalhes
                          <ArrowUpRight className="size-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
