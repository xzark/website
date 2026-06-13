import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeader } from "@/components/site/section-header"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Quem somos: missão, princípios e história da xZark — engenheiros construindo a infraestrutura de segurança que gostariam de usar.",
}

const principles = [
  {
    n: "01",
    title: "Segurança como produto",
    description:
      "Tratamos segurança como feature de produto, não como custo. Cada lançamento passa por threat modeling antes da primeira linha de código.",
  },
  {
    n: "02",
    title: "Privacidade verificável",
    description:
      "Não pedimos confiança — provamos. Auditorias públicas, código aberto e provas criptográficas substituem promessas de marketing.",
  },
  {
    n: "03",
    title: "Engenharia transparente",
    description:
      "Postmortems públicos, roadmap aberto, decisões arquiteturais documentadas. Nossos clientes sabem o que estamos construindo.",
  },
  {
    n: "04",
    title: "Default seguro",
    description:
      "Configurações inseguras simplesmente não existem. Se você precisa pensar para usar de forma segura, nós falhamos no design.",
  },
]

const team = [
  { name: "Artur Álvaro", role: "CEO & founder", area: "Security Engineering" },
]

const milestones = [
  { year: "2026", title: "Fundação", description: "xZark é fundada por veteranos de segurança ofensiva e infraestrutura distribuída." },
]

/** Página Sobre — missão, princípios, time e timeline */
export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Sobre a xZark"
          title={
            <>
              Construímos a infraestrutura de segurança que <span className="font-serif italic text-primary">gostaríamos</span> de usar.
            </>
          }
          description="Somos engenheiros de segurança e infraestrutura cansados de ferramentas que prometem proteção e entregam complexidade. xZark existe para mudar isso."
        />

        {/* Manifesto */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <SectionHeader eyebrow="Manifesto" title={<>Nossa <span className="font-serif italic">missão</span>.</>} />
              </div>
              <div className="md:col-span-8">
                <div className="space-y-6 text-pretty text-base leading-relaxed text-foreground/90 md:text-lg">
                  <p>
                    Cibersegurança virou um mercado de ruído. Soluções fragmentadas, dashboards superficiais e SLAs sem dentes. Empresas pagam caro por uma falsa sensação de proteção — até que um incidente expõe a verdade.
                  </p>
                  <p>
                    Acreditamos que segurança não é um plug-in. É arquitetura. É escolha de design. É um conjunto de garantias verificáveis que se sustentam sob ataque real, não apenas em apresentações de venda.
                  </p>
                  <p>
                    Por isso construímos xZark: uma plataforma onde cada componente é projetado para resistir a adversários, auditável até o nível criptográfico e operada por quem entende que confiança se conquista — nunca se assume.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Princípios */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Princípios"
              title={<>Quatro regras. <span className="font-serif italic">Sem exceções</span>.</>}
            />
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2">
              {principles.map((p) => (
                <div
                  key={p.n}
                  className="bg-card p-7 md:p-9"
                  style={{ boxShadow: "0 0 0 1px var(--border)" }}
                >
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
                    {p.n}
                  </span>
                  <h3 className="mt-4 text-2xl font-medium tracking-tight">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Linha do tempo"
              title={<>Cinco anos de <span className="font-serif italic">execução</span>.</>}
            />
            <div className="mt-12 space-y-px overflow-hidden border border-border/60">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className="grid grid-cols-1 gap-3 bg-card px-6 py-6 md:grid-cols-12 md:items-center md:gap-8 md:px-8"
                  style={{ boxShadow: i === 0 ? "none" : "0 -1px 0 0 var(--border)" }}
                >
                  <p className="font-mono text-sm tracking-[0.1em] text-primary md:col-span-2">
                    {m.year}
                  </p>
                  <h3 className="text-lg font-medium tracking-tight md:col-span-3">
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground md:col-span-7">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Time */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader
                eyebrow="Liderança"
                title={<>Operado por quem <span className="font-serif italic">já viveu</span> incidentes reais.</>}
              />
              <Link
                href="/contact"
                className="inline-flex items-center gap-1 self-start text-sm text-foreground transition-colors hover:text-primary md:self-auto"
              >
                Junte-se ao time
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-3">
              {team.map((t) => (
                <div
                  key={t.name}
                  className="bg-card p-6"
                  style={{ boxShadow: "0 0 0 1px var(--border)" }}
                >
                  <div
                    aria-hidden
                    className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md border border-border/60 bg-gradient-to-br from-background to-card"
                  >
                    <div className="font-serif text-5xl italic text-primary/80 text-glow">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                  <h3 className="mt-5 text-base font-medium tracking-tight">{t.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                  <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                    {t.area}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  )
}
