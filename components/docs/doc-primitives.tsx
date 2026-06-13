/**
 * Primitivas de conteúdo da documentação.
 *
 * Blocos reutilizáveis que mantêm exatamente a linguagem visual atual
 * (bordas suaves, `bg-muted/20`, eyebrows em font-mono, acentos em primary).
 * Usar essas primitivas garante consistência e escaneabilidade entre páginas.
 */
import type * as React from "react"
import {
  AlertTriangle,
  Check,
  Info,
  Lightbulb,
  ShieldAlert,
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Parágrafo e texto                                                   */
/* ------------------------------------------------------------------ */

export function Lead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-pretty text-base leading-relaxed text-foreground/85 md:text-lg">
      {children}
    </p>
  )
}

export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>
}

/* ------------------------------------------------------------------ */
/* Callout                                                             */
/* ------------------------------------------------------------------ */

type CalloutVariant = "info" | "tip" | "warning" | "danger" | "success"

const calloutStyles: Record<
  CalloutVariant,
  { wrap: string; icon: React.ElementType; iconColor: string }
> = {
  info: {
    wrap: "border-border/60 bg-muted/20",
    icon: Info,
    iconColor: "text-foreground/70",
  },
  tip: {
    wrap: "border-primary/25 bg-primary/5",
    icon: Lightbulb,
    iconColor: "text-primary",
  },
  warning: {
    wrap: "border-amber-500/25 bg-amber-500/5",
    icon: AlertTriangle,
    iconColor: "text-amber-400",
  },
  danger: {
    wrap: "border-red-500/25 bg-red-500/5",
    icon: ShieldAlert,
    iconColor: "text-red-400",
  },
  success: {
    wrap: "border-success/30 bg-success/10",
    icon: Check,
    iconColor: "text-success",
  },
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant
  title?: string
  children: React.ReactNode
}) {
  const style = calloutStyles[variant]
  const Icon = style.icon
  return (
    <div className={cn("rounded-xl border p-4", style.wrap)}>
      <div className="flex gap-3">
        <Icon className={cn("mt-0.5 size-4 shrink-0", style.iconColor)} />
        <div className="space-y-1">
          {title && (
            <p className="text-sm font-medium text-foreground">{title}</p>
          )}
          <div className="text-sm leading-relaxed text-foreground/80">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Grade de recursos / itens                                           */
/* ------------------------------------------------------------------ */

export function FeatureGrid({
  items,
  columns = 2,
}: {
  items: string[]
  columns?: 1 | 2
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {items.map((item) => (
        <div
          key={item}
          className="flex items-start gap-2.5 rounded-xl border border-border/50 bg-muted/20 px-4 py-3"
        >
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span className="text-sm text-foreground/80">{item}</span>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Passos numerados                                                    */
/* ------------------------------------------------------------------ */

export function Steps({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative space-y-6 border-l border-border/60 pl-6">
      {children}
    </ol>
  )
}

export function Step({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute -left-[31px] top-1 size-2.5 rounded-full border border-primary/50 bg-background ring-4 ring-background"
      >
        <span className="absolute inset-0.5 rounded-full bg-primary" />
      </span>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      <div className="mt-3 space-y-4 text-sm leading-relaxed text-foreground/80">
        {children}
      </div>
    </li>
  )
}

/* ------------------------------------------------------------------ */
/* Tabela de propriedades / parâmetros                                 */
/* ------------------------------------------------------------------ */

export interface PropRow {
  name: string
  type: string
  required?: boolean
  description: string
}

export function PropTable({ rows }: { rows: PropRow[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/60">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border/60 bg-muted/20">
            <th className="px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Parâmetro
            </th>
            <th className="px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Tipo
            </th>
            <th className="px-4 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted-foreground">
              Descrição
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.name}
              className="border-b border-border/40 last:border-0"
            >
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-[13px] text-foreground">
                  {row.name}
                </code>
                {row.required && (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                    obrigatório
                  </span>
                )}
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-[13px] text-muted-foreground">
                  {row.type}
                </code>
              </td>
              <td className="px-4 py-3 align-top text-foreground/80">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Lista de definições (ex: códigos de erro, eventos)                  */
/* ------------------------------------------------------------------ */

export function DefinitionList({
  items,
}: {
  items: { term: string; description: string }[]
}) {
  return (
    <div className="grid gap-3">
      {items.map((item) => (
        <div
          key={item.term}
          className="rounded-xl border border-border/50 bg-muted/20 p-4"
        >
          <code className="font-mono text-[13px] font-medium text-foreground">
            {item.term}
          </code>
          <p className="mt-1.5 text-sm text-foreground/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Cartões de navegação interna                                        */
/* ------------------------------------------------------------------ */

export function CardLink({
  href,
  title,
  description,
}: {
  href: string
  title: string
  description: string
}) {
  return (
    <a
      href={href}
      className="group rounded-2xl border border-border/60 bg-card p-5 transition-colors hover:border-primary/40"
    >
      <h3 className="text-base font-medium text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </a>
  )
}

export function CardGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid gap-4 sm:grid-cols-2">{children}</div>
}
