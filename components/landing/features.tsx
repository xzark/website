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
      "Workloads sensíveis rodam em enclaves dedicados com atestação remota. Nem mesmo nossos engenheiros têm acesso aos seus dados.",
  },
  {
    icon: EyeOff,
    title: "Privacidade verificável",
    description:
      "Criptografia ponta a ponta com chaves sob seu controle (BYOK). Provas criptográficas de não-acesso publicadas mensalmente.",
  },
  {
    icon: Globe,
    title: "Soberania regional",
    description:
      "32 regiões com isolamento jurisdicional total. Dados brasileiros permanecem no Brasil; europeus, na UE — sem exceções.",
  },
  {
    icon: TerminalSquare,
    title: "API-first, programável",
    description:
      "Tudo na xZark é API. CLI, Terraform, SDKs em 12 linguagens e integração nativa com seu pipeline existente.",
  },
  {
    icon: GitBranch,
    title: "Auditoria imutável",
    description:
      "Cada evento é assinado criptograficamente e armazenado em log append-only. Rastreabilidade completa, à prova de adulteração.",
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
          eyebrow="Engenharia"
          title={
            <>
              Construído por engenheiros, <br className="hidden md:block" />
              <span className="font-serif italic">para</span> engenheiros.
            </>
          }
          description="Cada decisão técnica é pública, auditável e reproduzível. Sem caixas-pretas, sem promessas vagas."
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
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
