/**
 * Rate Limit Frontend — protocolo de cooperação com o backend Go.
 *
 * O backend Go é a fonte da verdade do rate limiting. Este módulo oferece:
 *  - Parser dos headers padrão IETF `RateLimit-*` retornados pelo backend.
 *  - Cliente local com janela deslizante para feedback imediato (otimista).
 *  - Helpers para exibir UX consistente quando o usuário se aproxima do limite.
 *
 * Headers consumidos (RFC 9239 draft):
 *   RateLimit-Limit: 1000
 *   RateLimit-Remaining: 327
 *   RateLimit-Reset: 42       (segundos até o reset)
 *   Retry-After: 30           (apenas em 429)
 */

export interface RateLimitInfo {
  limit: number
  remaining: number
  resetIn: number // segundos
  retryAfter?: number
}

/** Lê headers de rate limit de um Response. */
export function parseRateLimitHeaders(headers: Headers): RateLimitInfo | null {
  const limit = Number(headers.get("RateLimit-Limit"))
  const remaining = Number(headers.get("RateLimit-Remaining"))
  const reset = Number(headers.get("RateLimit-Reset"))
  if (!Number.isFinite(limit) || !Number.isFinite(remaining)) return null
  return {
    limit,
    remaining,
    resetIn: Number.isFinite(reset) ? reset : 0,
    retryAfter: Number(headers.get("Retry-After")) || undefined,
  }
}

/** Retorna o nível de aviso baseado no consumo. */
export function rateLimitSeverity(
  info: RateLimitInfo,
): "ok" | "warning" | "critical" | "exceeded" {
  if (info.remaining <= 0) return "exceeded"
  const ratio = info.remaining / info.limit
  if (ratio < 0.05) return "critical"
  if (ratio < 0.2) return "warning"
  return "ok"
}

/** Janela deslizante client-side (defesa em profundidade, não substitui backend). */
export class ClientRateLimiter {
  private hits: number[] = []
  constructor(
    private readonly maxRequests: number,
    private readonly windowMs: number,
  ) {}

  /** Tenta consumir um slot. Retorna `false` se o limite local foi atingido. */
  tryConsume(): boolean {
    const now = Date.now()
    this.hits = this.hits.filter((t) => now - t < this.windowMs)
    if (this.hits.length >= this.maxRequests) return false
    this.hits.push(now)
    return true
  }

  /** Tempo em ms até o próximo slot livre. */
  retryAfterMs(): number {
    if (this.hits.length === 0) return 0
    const oldest = this.hits[0]
    return Math.max(0, this.windowMs - (Date.now() - oldest))
  }
}
