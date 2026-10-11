import Link from "next/link"
import { ArrowRight, Check, Minus } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { Button } from "@/components/ui/button"

const plans = [
  {
    name: "Free",
    price: "R$ 0",
    mau: "500 MAU",
    description: "Para começar a explorar autenticação com os fundamentos essenciais.",
    cta: "Começar gratuitamente",
    href: "/contact?plan=free",
    featured: false,
    features: [
      "Cadastro e login por e-mail e senha",
      "Login social com Google",
      "Verificação de e-mail",
      "Recuperação de senha",
      "Gerenciamento de sessões",
      "SDKs, API e documentação",
      "Painel básico de gerenciamento",
      "Proteções essenciais de segurança",
      "1 projeto de produção e 1 ambiente de desenvolvimento",
    ],
    unavailable: ["Outros provedores sociais", "Organizações, membros e convites", "Suporte prioritário"],
  },
  {
    name: "Pro",
    price: "R$ 149",
    mau: "10.000 MAU",
    description: "Para equipes que precisam de mais flexibilidade, colaboração e controle.",
    cta: "Começar teste grátis de 14 dias",
    href: "/contact?plan=pro",
    featured: true,
    features: [
      "Todos os recursos do Free",
      "Google e outros provedores sociais suportados",
      "Organizações, membros e convites",
      "Papéis e permissões",
      "Mais projetos e ambientes",
      "Logs de autenticação ampliados",
      "Controles adicionais de segurança",
      "Suporte prioritário por e-mail",
    ],
    unavailable: [],
  },
  {
    name: "Business",
    price: "R$ 499",
    mau: "50.000 MAU",
    description: "Para organizações que precisam de escala e controles avançados.",
    cta: "Falar com a equipe comercial",
    href: "/contact?plan=business",
    featured: false,
    features: [
      "Todos os recursos do Pro",
      "Limites superiores de utilização",
      "Auditoria avançada e exportação de eventos, conforme implementação",
      "Políticas de sessão configuráveis",
      "Gestão avançada de organizações",
      "Controles de acesso para equipes",
      "Suporte prioritário ampliado",
    ],
    unavailable: [],
  },
] as const

const comparison = [
  ["Preço mensal", "R$ 0", "R$ 149", "R$ 499"],
  ["MAU incluídos", "500", "10.000", "50.000"],
  ["E-mail e senha", "Sim", "Sim", "Sim"],
  ["Login com Google", "Sim", "Sim", "Sim"],
  ["Outros provedores sociais", "Não", "Conforme suporte", "Conforme suporte"],
  ["Recuperação de senha", "Sim", "Sim", "Sim"],
  ["SDKs e documentação", "Sim", "Sim", "Sim"],
  ["Organizações e convites", "Não", "Sim", "Sim"],
  ["Papéis e permissões", "Básicos, se disponíveis", "Sim", "Avançados"],
  ["Logs de autenticação", "Básicos", "Ampliados", "Auditoria avançada"],
  ["Controles avançados de segurança", "Não", "Parcialmente", "Sim"],
  ["Suporte prioritário", "Não", "Sim", "Ampliado"],
  ["SSO empresarial", "Não", "Sob contratação", "Sob contratação"],
] as const

export default function XAuthPricingPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
      <PageHero
        eyebrow="xAuth · planos"
        title={<>Autenticação que cresce com o seu <span className="font-serif italic text-primary">produto</span>.</>}
        description="Escolha o ponto de partida para sua equipe. Os planos abaixo descrevem a estrutura comercial em evolução da xAuth; recursos sujeitos a implementação ou contratação estão identificados."
      />

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {plans.map((plan) => (
            <article key={plan.name} className={`relative flex flex-col border p-6 md:p-8 ${plan.featured ? "border-primary bg-primary/[0.04]" : "border-border/70 bg-card/30"}`}>
              {plan.featured && <span className="absolute -top-px left-6 -translate-y-1/2 bg-primary px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground">Mais escolhido</span>}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">xAuth</p>
                  <h2 className="mt-3 text-2xl font-medium">{plan.name}</h2>
                </div>
                <p className="font-mono text-xs text-primary">{plan.mau}</p>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
              <div className="mt-8 border-y border-border/60 py-5">
                <span className="text-4xl font-medium tracking-tight">{plan.price}</span><span className="ml-2 text-sm text-muted-foreground">/mês</span>
              </div>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {plan.features.map((feature) => <li key={feature} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span>{feature}</span></li>)}
                {plan.unavailable.map((feature) => <li key={feature} className="flex gap-2 text-muted-foreground"><Minus className="mt-0.5 size-4 shrink-0" /><span>{feature}</span></li>)}
              </ul>
              <Button asChild className={`mt-8 w-full ${plan.featured ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-foreground text-background hover:bg-foreground/90"}`}>
                <Link href={plan.href}>{plan.cta}<ArrowRight className="ml-2 size-4" /></Link>
              </Button>
              {plan.name === "Pro" && <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">Teste de 14 dias. Ao terminar, você poderá contratar o Pro ou continuar no Free, conforme as regras de migração da aplicação.</p>}
              {plan.name === "Business" && <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">SSO, SLA, suporte 24/7 e implantação dedicada dependem de contratação específica.</p>}
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border/60 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">Comparação</p><h2 className="mt-3 text-3xl font-medium tracking-tight">Veja as diferenças com clareza.</h2></div>
          <div className="overflow-x-auto border border-border/70">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm"><caption className="sr-only">Comparação entre os planos Free, Pro e Business da xAuth</caption><thead><tr className="border-b border-border/70 bg-card/50"><th scope="col" className="px-4 py-4 font-medium">Recurso</th><th scope="col" className="px-4 py-4 font-medium">Free</th><th scope="col" className="bg-primary/[0.06] px-4 py-4 font-medium">Pro</th><th scope="col" className="px-4 py-4 font-medium">Business</th></tr></thead><tbody>{comparison.map((row) => <tr key={row[0]} className="border-b border-border/50 last:border-0"><th scope="row" className="px-4 py-4 font-normal text-muted-foreground">{row[0]}</th><td className="px-4 py-4">{row[1]}</td><td className="bg-primary/[0.03] px-4 py-4">{row[2]}</td><td className="px-4 py-4">{row[3]}</td></tr>)}</tbody></table>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">MAU significa usuários ativos mensais. As condições de utilização, limites e eventuais serviços adicionais serão definidos nos termos comerciais aplicáveis.</p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8"><h2 className="text-3xl font-medium tracking-tight">Precisa de ajuda para escolher?</h2><p className="mx-auto mt-4 max-w-xl text-muted-foreground">Converse com a equipe sobre seu contexto, arquitetura e estágio de adoção.</p><Button asChild variant="outline" className="mt-8"><Link href="/contact?plan=consultation">Falar com a equipe<ArrowRight className="ml-2 size-4" /></Link></Button></section>
      </main>
      <Footer />
    </>
  )
}
