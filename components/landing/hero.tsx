"use client"

/**
 * Hero da landing — composição editorial com headline serif/sans,
 * grid futurista, preview de terminal e CTAs.
 * Inspirada na referência Jaguar·Glow (estética premium dark).
 */
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, ShieldCheck } from "lucide-react"
import { GridBackground } from "@/components/site/grid-background"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <GridBackground />

      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32 lg:pb-32">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/60 px-3 py-1 backdrop-blur">
            <span aria-hidden className="size-1.5 animate-pulse-soft rounded-full bg-success" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Plataforma 12.0 — Outono / Inverno 2026
            </span>
          </div>
        </motion.div>

        {/* Editorial line — inspirada na ref. com data limitada */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2"
        >
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
              Edição enterprise — disponibilidade global
            </p>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              Infraestrutura zero-trust com mTLS nativo, isolamento por hardware e auditoria criptográfica imutável.
            </p>
          </div>
          <div className="md:text-right">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Build estável
            </p>
            <p className="mt-2 font-mono text-[11px] text-muted-foreground">
              v12.4.1 &nbsp;·&nbsp; 2026
            </p>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-16 text-balance font-sans text-[15vw] leading-[0.92] tracking-tight md:mt-20 md:text-[10vw] lg:text-[8.4rem]"
        >
          <span className="block">
            <span className="font-serif italic text-primary text-glow">secure</span>
            <span className="text-foreground/90"> by</span>
          </span>
          <span className="block text-foreground">design.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          xZark é a infraestrutura de cibersegurança e privacidade para empresas que tratam segurança como produto, não como custo. Identidade, proteção, criptografia e rede em uma única plataforma.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center"
        >
          <Button
            asChild
            size="lg"
            className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
          >
            <Link href="/contact">
              Solicitar acesso
              <ArrowUpRight className="ml-1 size-4" />
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="ghost"
            className="h-11 rounded-md border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground hover:bg-accent/40"
          >
            <Link href="/products">Explorar produtos</Link>
          </Button>
          <div className="ml-0 flex items-center gap-2 text-xs text-muted-foreground sm:ml-4">
            <ShieldCheck className="size-3.5 text-success" />
            <span>SOC 2 · ISO 27001 · LGPD</span>
          </div>
        </motion.div>

        {/* Preview de terminal flutuante */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 md:mt-24"
        >
          <TerminalPreview />
        </motion.div>
      </div>
    </section>
  )
}

/** Preview de terminal — efeito glassmorphism, conteúdo técnico real */
function TerminalPreview() {
  return (
    <div className="relative mx-auto max-w-4xl">
      {/* Glow base */}
      <div
        aria-hidden
        className="absolute -inset-x-10 -inset-y-6 -z-10 rounded-[28px] opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.72 0.18 245 / 0.25), transparent)",
        }}
      />

      <div className="overflow-hidden rounded-xl border border-border/80 bg-card/60 shadow-2xl backdrop-blur-xl">
        {/* Header da janela */}
        <div className="flex items-center justify-between border-b border-border/60 bg-background/40 px-4 py-2.5">
          <div className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-destructive/60" />
            <span className="size-2.5 rounded-full bg-warning/60" />
            <span className="size-2.5 rounded-full bg-success/60" />
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            xzark.cli &nbsp;—&nbsp; ~/infra
          </span>
          <span className="font-mono text-[10.5px] text-muted-foreground">v12.4</span>
        </div>

        {/* Body */}
        <div className="grid gap-0 md:grid-cols-[1fr_280px]">
          <div className="p-5 font-mono text-[12.5px] leading-relaxed">
            <Line prompt user="ops@xzark" host="prod">
              xzark deploy --policy zero-trust --region global
            </Line>
            <Line type="info">
              <span className="text-primary">›</span> Validating manifest …{" "}
              <span className="text-success">ok</span>
            </Line>
            <Line type="info">
              <span className="text-primary">›</span> Issuing mTLS certificates …{" "}
              <span className="text-success">ok</span>
            </Line>
            <Line type="info">
              <span className="text-primary">›</span> Rotating secrets via xVault …{" "}
              <span className="text-success">ok</span>
            </Line>
            <Line type="info">
              <span className="text-primary">›</span> Provisioning xShield rules (84) …{" "}
              <span className="text-success">ok</span>
            </Line>
            <Line type="info">
              <span className="text-primary">›</span> Deploying to 32 regions …{" "}
              <span className="text-success">ok</span>
            </Line>
            <Line type="success">
              <span className="text-success">✓</span> Deployment complete in{" "}
              <span className="text-foreground">14.2s</span>
            </Line>
            <Line type="muted">
              audit:{" "}
              <span className="text-primary">
                xzark.co/audit/9f3a2b8e-71c4-4d9a
              </span>
            </Line>
            <Line prompt user="ops@xzark" host="prod">
              <span className="text-foreground">_</span>
              <span className="ml-px inline-block h-3.5 w-2 animate-pulse bg-primary align-middle" />
            </Line>
          </div>

          {/* Painel lateral de métricas */}
          <aside className="hidden border-l border-border/60 bg-background/30 p-5 md:block">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
              Live Telemetry
            </p>
            <div className="mt-4 space-y-4">
              <Metric label="Threats blocked" value="1.2M" trend="+8.4%" />
              <Metric label="Avg latency" value="7.8ms" trend="-2.1%" good />
              <Metric label="Active sessions" value="84.2k" trend="+1.9%" />
              <Metric label="Uptime" value="99.999%" trend="30d" good />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function Line({
  children,
  prompt,
  user,
  host,
  type = "default",
}: {
  children: React.ReactNode
  prompt?: boolean
  user?: string
  host?: string
  type?: "default" | "info" | "success" | "muted"
}) {
  return (
    <div className="flex gap-2">
      {prompt ? (
        <span className="text-muted-foreground">
          <span className="text-primary">{user}</span>
          <span>@</span>
          <span className="text-foreground/80">{host}</span>
          <span className="ml-1 text-muted-foreground">$</span>
        </span>
      ) : (
        <span aria-hidden className="w-0" />
      )}
      <span
        className={
          type === "muted"
            ? "text-muted-foreground"
            : type === "success"
              ? "text-foreground"
              : "text-foreground/90"
        }
      >
        {children}
      </span>
    </div>
  )
}

function Metric({
  label,
  value,
  trend,
  good,
}: {
  label: string
  value: string
  trend: string
  good?: boolean
}) {
  return (
    <div>
      <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-mono text-base text-foreground">{value}</span>
        <span
          className={
            good
              ? "font-mono text-[11px] text-success"
              : "font-mono text-[11px] text-muted-foreground"
          }
        >
          {trend}
        </span>
      </div>
    </div>
  )
}
