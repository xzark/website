import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check, Lock } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { PageHero } from "@/components/site/page-hero"
import { SectionHeader } from "@/components/site/section-header"
import { Compliance } from "@/components/landing/compliance"
import { CTA } from "@/components/landing/cta"

export const metadata: Metadata = {
  title: "Segurança",
  description:
    "Postura de segurança xZark: arquitetura, controles, criptografia, programa de bug bounty e relatórios públicos.",
}

const layers = [
  {
    title: "Camada de identidade",
    items: [
      "Autenticação obrigatória via passkey ou hardware key (FIDO2)",
      "MFA adaptativo com risk scoring contínuo",
      "Sessões com TTL curto e rotação automática",
      "Revogação granular por dispositivo, aplicação ou IP",
    ],
  },
  {
    title: "Camada de rede",
    items: [
      "mTLS obrigatório em todo tráfego, incluindo east-west",
      "Microsegmentação L4/L7 por workload",
      "Inspeção stateful com WAF programável",
      "Mitigação DDoS L3-L7 até 10 Tbps",
    ],
  },
  {
    title: "Camada de dados",
    items: [
      "Criptografia em trânsito (TLS 1.3) e em repouso (AES-256-GCM)",
      "Envelope encryption com KEK rotacionada a cada 90 dias",
      "BYOK: chaves geradas em HSM sob seu controle",
      "Pós-quântica ready: Kyber/Dilithium em rollout gradual",
    ],
  },
  {
    title: "Camada operacional",
    items: [
      "Acesso de engenheiros via break-glass auditado",
      "Logs imutáveis assinados criptograficamente",
      "Backup geo-redundante imutável (3-2-1-1-0)",
      "DR com RTO < 15min e RPO < 5min",
    ],
  },
]

const reports = [
  { title: "SOC 2 Type II — Q1 2026", date: "2026-01-15", type: "Auditoria externa" },
  { title: "Pentest anual — Q4 2025", date: "2025-11-30", type: "Crowdstrike Red Team" },
  { title: "Relatório de transparência — 2025", date: "2026-01-01", type: "Solicitações de dados" },
  { title: "Postmortem incidente xCloud-2025-03", date: "2025-08-12", type: "Public postmortem" },
]

/** Página Security — postura técnica, programa bug bounty, relatórios */
export default function SecurityPage() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        <PageHero
          eyebrow="Postura de segurança"
          title={
            <>
              Defesa em <span className="font-serif italic text-primary">profundidade</span>.
              Confiança em camadas.
            </>
          }
          description="Não trabalhamos com promessas. Aqui está exatamente como a infraestrutura xZark é projetada, monitorada e auditada — em detalhe técnico."
          meta={[
            { label: "Tempo médio detecção", value: "< 90s" },
            { label: "Tempo médio contenção", value: "< 8min" },
            { label: "Bug bounty pago", value: "$2.4M" },
            { label: "Pesquisadores ativos", value: "1.2k+" },
          ]}
        />

        {/* Camadas de defesa */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Arquitetura"
              title={<>Quatro <span className="font-serif italic">camadas</span> independentes.</>}
              description="Cada camada falha de forma segura por padrão. Comprometer uma não compromete as outras."
            />
            <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-border/60 md:grid-cols-2">
              {layers.map((l) => (
                <div
                  key={l.title}
                  className="bg-card p-7 md:p-9"
                  style={{ boxShadow: "0 0 0 1px var(--border)" }}
                >
                  <div className="inline-flex size-9 items-center justify-center rounded-md border border-border/80 bg-background/60">
                    <Lock className="size-4 text-primary" />
                  </div>
                  <h3 className="mt-5 text-xl font-medium tracking-tight">{l.title}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {l.items.map((i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/90">
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bug Bounty */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-5">
                <SectionHeader
                  eyebrow="Bug Bounty"
                  title={<>Pagamos para sermos <span className="font-serif italic">quebrados</span>.</>}
                  description="Nosso programa de bug bounty é público, sem NDA restritivo e com pagamentos competitivos. Encontrou algo? Reporte e seja recompensado."
                />
                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    className="inline-flex h-11 items-center gap-1.5 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                  >
                    Reportar vulnerabilidade
                    <ArrowUpRight className="size-4" />
                  </Link>
                  <Link
                    href="/security#scope"
                    className="inline-flex h-11 items-center rounded-md border border-border/80 px-5 text-sm font-medium text-foreground transition-colors hover:bg-accent/40"
                  >
                    Ver escopo
                  </Link>
                </div>
              </div>
              <div className="md:col-span-7">
                <div className="grid grid-cols-2 gap-px overflow-hidden border border-border/60">
                  {[
                    { label: "Critical (RCE, auth bypass)", value: "$25,000 — $100,000" },
                    { label: "High (privilege esc.)", value: "$5,000 — $25,000" },
                    { label: "Medium (info disclosure)", value: "$1,000 — $5,000" },
                    { label: "Low (best practice)", value: "$200 — $1,000" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      className="bg-card p-6"
                      style={{ boxShadow: "0 0 0 1px var(--border)" }}
                    >
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                        {b.label}
                      </p>
                      <p className="mt-2 font-sans text-base tabular-nums">{b.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <Compliance />

        {/* Relatórios públicos */}
        <section className="border-b border-border/60 bg-background py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Transparência"
              title={<>Relatórios <span className="font-serif italic">públicos</span>.</>}
              description="Auditorias, pentests, postmortems e relatórios de transparência — todos disponíveis sob NDA mínimo."
            />
            <div className="mt-12 divide-y divide-border/60 border border-border/60">
              {reports.map((r) => (
                <Link
                  key={r.title}
                  href="/contact"
                  className="group flex items-center justify-between gap-4 bg-card px-6 py-5 transition-colors hover:bg-card/60"
                >
                  <div className="min-w-0">
                    <p className="truncate text-base font-medium tracking-tight">
                      {r.title}
                    </p>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
                      {r.type} · {r.date}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </Link>
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
