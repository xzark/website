import type { Metadata } from "next"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeader } from "@/components/site/section-header"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "Sobre",
  description: "Missão e princípios da xZark.",
}

const principles = [
  { n: "01", title: "Segurança como produto", description: "Tratamos segurança como parte do design, não como uma camada adicionada depois." },
  { n: "02", title: "Privacidade verificável", description: "Preferimos controles explícitos, documentação clara e hipóteses que possam ser avaliadas." },
  { n: "03", title: "Engenharia transparente", description: "Decisões arquiteturais e limites devem ser compreensíveis para quem constrói e opera sistemas." },
  { n: "04", title: "Default seguro", description: "Boas escolhas de segurança devem ser o caminho natural, com menor complexidade operacional." },
]

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero eyebrow="Sobre a xZark" title={<>Infraestrutura de segurança com <span className="font-serif italic text-primary">clareza</span>.</>} description="A xZark é uma iniciativa dedicada a explorar produtos e serviços de cibersegurança e privacidade para empresas modernas." />
        <section className="border-b border-border/60 bg-background py-20 md:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-10 md:grid-cols-12"><div className="md:col-span-4"><SectionHeader eyebrow="Manifesto" title={<>Nossa <span className="font-serif italic">missão</span>.</>} /></div><div className="md:col-span-8"><div className="space-y-6 text-pretty text-base leading-relaxed text-foreground/90 md:text-lg"><p>Cibersegurança não precisa ser um conjunto de promessas difíceis de avaliar. Ela pode ser uma disciplina de engenharia, com escolhas explícitas e limites conhecidos.</p><p>Construímos a xZark para investigar essa ideia: ferramentas e conceitos que ajudem empresas a pensar sobre identidade, proteção, segredos, infraestrutura e rede.</p><p>Os produtos apresentados estão em evolução. Publicamos o que estiver confirmado e evitamos transformar hipóteses em garantias.</p></div></div></div></div></section>
        <section className="border-b border-border/60 bg-background py-20 md:py-28"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><SectionHeader eyebrow="Princípios" title={<>Quatro regras. <span className="font-serif italic">Sem atalhos</span>.</>} /><div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2">{principles.map((p) => <div key={p.n} className="bg-card p-7 md:p-9" style={{ boxShadow: "0 0 0 1px var(--border)" }}><span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">{p.n}</span><h3 className="mt-4 text-2xl font-medium tracking-tight">{p.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.description}</p></div>)}</div></div></section>
        <CTA />
      </main>
      <Footer />
    </>
  )
}
