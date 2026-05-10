import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { Mail, MessageSquare, Phone, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com o time xZark. Comercial, suporte técnico, segurança ou imprensa — escolha o canal correto.",
}

const channels = [
  {
    icon: MessageSquare,
    title: "Comercial",
    description: "Avaliação técnica, POCs e contratação enterprise.",
    contact: "sales@xzark.co",
    responseTime: "< 24h",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Reporte de vulnerabilidades e bug bounty (PGP disponível).",
    contact: "security@xzark.co",
    responseTime: "< 4h",
  },
  {
    icon: Phone,
    title: "Suporte 24/7",
    description: "Incidentes P1/P2 para clientes ativos com SLA enterprise.",
    contact: "+55 11 4040-XZRK",
    responseTime: "< 15min P1",
  },
  {
    icon: Mail,
    title: "Imprensa",
    description: "Releases, entrevistas e materiais de mídia.",
    contact: "press@xzark.co",
    responseTime: "< 48h",
  },
]

/** Página Contact — formulário + canais diretos */
export default function ContactPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Contato"
          title={
            <>
              Vamos <span className="font-serif italic text-primary">conversar</span>.
            </>
          }
          description="Engenheiros falam com engenheiros. Sem SDR genérico, sem script — apenas pessoas que entendem o que você está construindo."
        />

        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 md:grid-cols-12">
              {/* Formulário */}
              <div className="md:col-span-7">
                <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8">
                  <h2 className="text-2xl font-medium tracking-tight">
                    Envie uma mensagem
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Resposta em até 24h úteis. Para urgência, use o canal direto correspondente.
                  </p>
                  <div className="mt-8">
                    <ContactForm />
                  </div>
                </div>
              </div>

              {/* Canais */}
              <div className="md:col-span-5">
                <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  Canais diretos
                </h2>
                <div className="mt-4 space-y-3">
                  {channels.map((c) => {
                    const Icon = c.icon
                    return (
                      <div
                        key={c.title}
                        className="rounded-lg border border-border/80 bg-card p-5 transition-colors hover:border-primary/40"
                      >
                        <div className="flex items-start gap-4">
                          <div className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border/80 bg-background/60">
                            <Icon className="size-4 text-primary" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-2">
                              <h3 className="text-base font-medium tracking-tight">
                                {c.title}
                              </h3>
                              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-success">
                                {c.responseTime}
                              </span>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {c.description}
                            </p>
                            <p className="mt-2 break-all font-mono text-xs text-foreground">
                              {c.contact}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Endereço */}
                <div className="mt-8 rounded-lg border border-border/80 bg-card p-5">
                  <h3 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    Sede
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">
                    Av. Brigadeiro Faria Lima, 4440
                    <br />
                    14º andar, Itaim Bibi
                    <br />
                    Salvador — BA, 04538-132
                    <br />
                    Brasil
                  </p>
                  <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    Operação 24/7 · 32 regiões globais
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
