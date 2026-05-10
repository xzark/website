"use client"

/**
 * RateLimitBanner — UX de aviso quando o usuário se aproxima ou atinge o limite.
 *
 * Renderiza uma faixa fina no topo (sticky) com cor escalando por severidade.
 * Aceita `info` retornado pelo backend Go via `parseRateLimitHeaders`.
 */
import { AlertTriangle, ShieldAlert, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  rateLimitSeverity,
  type RateLimitInfo,
} from "@/lib/security/rate-limit"

interface RateLimitBannerProps {
  info: RateLimitInfo | null
  className?: string
}

const severityStyles = {
  warning:
    "border-amber-500/30 bg-amber-500/10 text-amber-300 [&_svg]:text-amber-400",
  critical:
    "border-orange-500/40 bg-orange-500/10 text-orange-300 [&_svg]:text-orange-400",
  exceeded:
    "border-red-500/50 bg-red-500/10 text-red-300 [&_svg]:text-red-400",
}

export function RateLimitBanner({ info, className }: RateLimitBannerProps) {
  if (!info) return null
  const sev = rateLimitSeverity(info)
  if (sev === "ok") return null

  const Icon =
    sev === "exceeded" ? ShieldAlert : sev === "critical" ? AlertTriangle : Zap
  const message =
    sev === "exceeded"
      ? `Limite de requisições excedido. Tente novamente em ${info.retryAfter ?? info.resetIn}s.`
      : sev === "critical"
        ? `Apenas ${info.remaining} de ${info.limit} requisições restantes nesta janela.`
        : `Você usou ${info.limit - info.remaining} de ${info.limit} requisições.`

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex items-center gap-3 border-b px-4 py-2 text-xs font-medium",
        severityStyles[sev],
        className,
      )}
    >
      <Icon className="size-3.5 shrink-0" />
      <span className="flex-1 truncate">{message}</span>
      <span className="font-mono opacity-70">reset em {info.resetIn}s</span>
    </div>
  )
}
