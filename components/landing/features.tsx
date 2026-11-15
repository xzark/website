/**
 * Features — diferenciais técnicos da plataforma xZark.
 * Layout em grade 3x2 com ícones, títulos e descrições concisas.
 */
import {
  Cpu,
  EyeOff,
  GitBranch,
  Globe,
  Layers,
  TerminalSquare,
} from "lucide-react"
import { SectionHeader } from "@/components/site/section-header"
import { LocaleText } from "@/components/site/locale-text"

const features = [
  {
    icon: Layers,
    title: "Zero Trust por design",
    description:
      "Nenhuma requisição é confiável por padrão. Toda interação é autenticada, autorizada e criptografada — incluindo tráfego interno.",
  },
  {
    icon: Cpu,
    title: "Hardware isolado",
    description:
      "Conceito de isolamento para workloads sensíveis, com fronteiras de acesso explícitas e verificáveis.",
  },
  {
    icon: EyeOff,
    title: "Privacidade verificável",
    description:
      "Exploramos criptografia ponta a ponta e modelos em que organizações mantêm maior controle sobre suas chaves.",
  },
  {
    icon: Globe,
    title: "Soberania regional",
    description:
      "Conceito de políticas regionais para ajudar organizações a definir onde seus dados podem operar.",
  },
  {
    icon: TerminalSquare,
    title: "API-first, programável",
    description:
      "Arquitetura API-first, projetada para integração com stacks modernas e evoluída em pesquisa e desenvolvimento.",
  },
  {
    icon: GitBranch,
    title: "Auditoria imutável",
    description:
      "Pesquisamos modelos de rastreabilidade verificável para eventos de segurança, sem apresentar controles futuros como operação disponível.",
  },
]

export function Features() {
  return (
    <section
      aria-labelledby="features-heading"
      className="relative border-b border-border/60 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow={<LocaleText pt="Engenharia" en="Engineering" />}
          title={<LocaleText pt={<>Construído por engenheiros, <br className="hidden md:block" /><span className="font-serif italic">para</span> engenheiros.</>} en={<>Built by engineers, <br className="hidden md:block" /><span className="font-serif italic">for</span> engineers.</>} />}
          description={<LocaleText pt="Cada decisão técnica é pública, auditável e reproduzível. Sem caixas-pretas, sem promessas vagas." en="Every technical decision is public, auditable, and reproducible. No black boxes, no vague promises." />}
        />

        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <div
                key={f.title}
                className="relative bg-card p-7 transition-colors hover:bg-card/60"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <div className="inline-flex size-9 items-center justify-center rounded-md border border-border/80 bg-background/60">
                  <Icon className="size-4 text-primary" />
                </div>
                <h3 className="mt-5 text-base font-medium tracking-tight">
                  <LocaleText pt={f.title} en={({ "Zero Trust por design": "Zero Trust by design", "Hardware isolado": "Isolated hardware", "Privacidade verificável": "Verifiable privacy", "Soberania regional": "Regional sovereignty", "API-first, programável": "Programmable API-first", "Auditoria imutável": "Immutable audit" } as Record<string, string>)[f.title] ?? f.title} />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  <LocaleText pt={f.description} en={({ "Nenhuma requisição é confiável por padrão. Toda interação é autenticada, autorizada e criptografada — incluindo tráfego interno.": "No request is trusted by default. Every interaction is authenticated, authorized, and encrypted — including internal traffic.", "Conceito de isolamento para workloads sensíveis, com fronteiras de acesso explícitas e verificáveis.": "An isolation concept for sensitive workloads, with explicit and verifiable access boundaries.", "Exploramos criptografia ponta a ponta e modelos em que organizações mantêm maior controle sobre suas chaves.": "We explore end-to-end encryption and models that give organizations greater control over their keys.", "Conceito de políticas regionais para ajudar organizações a definir onde seus dados podem operar.": "A concept for regional policies that help organizations define where their data can operate.", "Arquitetura API-first, projetada para integração com stacks modernas e evoluída em pesquisa e desenvolvimento.": "An API-first architecture designed for modern stacks and evolving through research and development.", "Pesquisamos modelos de rastreabilidade verificável para eventos de segurança, sem apresentar controles futuros como operação disponível.": "We research verifiable traceability models for security events without presenting future controls as available operations." } as Record<string, string>)[f.description] ?? f.description} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
