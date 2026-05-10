import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { CTA } from "@/components/landing/cta"
import { services } from "@/lib/site-config"

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Serviços profissionais de cibersegurança xZark: auditoria, resposta a incidentes, compliance, zero-trust, threat hunting e managed security.",
}

/**
 * Página de serviços profissionais.
 * Lista os 6 serviços com deliverables, ícones e CTA.
 */
export default function ServicesPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Serviços profissionais"
          title={
            <>
              Engenharia de segurança <span className="font-serif italic text-primary">sob demanda</span>.
            </>
          }
          description="Times sêniores especializados em cibersegurança ofensiva e defensiva. Operamos como extensão da sua equipe, com SLAs contratuais e entregáveis claros."
          meta={[
            { label: "SLA mínimo", value: "99.9%" },
            { label: "Resposta P1", value: "< 15min" },
            { label: "Engenheiros", value: "120+" },
            { label: "Países atendidos", value: "42" },
          ]}
        />

        <section className="border-b border-border/60 bg-background py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2">
              {services.map((s) => {
                const Icon = s.icon
                return (
                  <article
                    key={s.slug}
                    id={s.slug}
                    className="relative bg-card p-7 md:p-9"
                    style={{ boxShadow: "0 0 0 1px var(--border)" }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex size-10 items-center justify-center rounded-md border border-border/80 bg-background/60">
                        <Icon className="size-4 text-primary" />
                      </div>
                      <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                        Serviço
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-medium tracking-tight">
                      {s.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>

                    <div className="mt-6 border-t border-border/60 pt-6">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                        Entregáveis
                      </p>
                      <ul className="mt-3 space-y-2.5">
                        {s.deliverables.map((d) => (
                          <li key={d} className="flex items-start gap-2.5 text-sm text-foreground/90">
                            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7">
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                      >
                        Iniciar engajamento
                        <ArrowUpRight className="size-4" />
                      </Link>
                    </div>
                  </article>
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
