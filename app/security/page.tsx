import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check, Lock } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeader } from "@/components/site/section-header"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "Segurança",
  description: "Princípios e conceitos de segurança da xZark.",
}

const layers = [
  { title: "Camada de identidade", items: ["Autenticação forte", "Princípio do menor privilégio", "Sessões com ciclo de vida explícito", "Revogação granular"] },
  { title: "Camada de rede", items: ["Comunicação autenticada", "Segmentação de workloads", "Políticas de tráfego", "Proteção de interfaces públicas"] },
  { title: "Camada de dados", items: ["Criptografia em trânsito e repouso", "Gestão de chaves", "Separação de ambientes", "Controles de acesso a dados"] },
  { title: "Camada operacional", items: ["Acesso administrativo controlado", "Eventos de segurança rastreáveis", "Backups e recuperação planejados", "Revisão contínua de controles"] },
]

/** Página Segurança — princípios e arquitetura conceitual, sem métricas ou certificações não verificadas. */
export default function SecurityPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Princípios de segurança"
          title={<>Defesa em <span className="font-serif italic text-primary">profundidade</span>.</>}
          description="A xZark explora uma abordagem de segurança baseada em identidade, segmentação, criptografia e controles verificáveis. Esta página apresenta conceitos, não certificações ou métricas operacionais."
        />

        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader eyebrow="Arquitetura" title={<>Quatro <span className="font-serif italic">camadas</span> de controle.</>} description="Uma arquitetura conceitual para reduzir confiança implícita e tornar decisões de segurança explícitas." />
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2">
              {layers.map((layer) => (
                <div key={layer.title} className="bg-card p-7 md:p-9" style={{ boxShadow: "0 0 0 1px var(--border)" }}>
                  <div className="inline-flex size-9 items-center justify-center rounded-md border border-border/80 bg-background/60"><Lock className="size-4 text-primary" /></div>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">{layer.title}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {layer.items.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/90"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{item}</span></li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5"><SectionHeader eyebrow="Transparência" title={<>Segurança como <span className="font-serif italic">processo</span>.</>} description="Documentamos decisões, limites e hipóteses à medida que os produtos evoluem. Para falar sobre segurança ou reportar uma questão, entre em contato." /></div>
              <div className="md:col-span-7"><div className="border border-border/60 bg-card p-7 md:p-9"><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">Estado atual</p><p className="mt-4 text-2xl font-medium tracking-tight">Pesquisa e desenvolvimento</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Os produtos xZark apresentados neste site são conceitos e frentes de desenvolvimento. Detalhes de disponibilidade serão publicados quando forem confirmados.</p><Link href="/contact" className="mt-7 inline-flex items-center gap-1.5 text-sm text-foreground transition-colors hover:text-primary">Falar com a xZark <ArrowUpRight className="size-4" /></Link></div></div>
            </div>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
