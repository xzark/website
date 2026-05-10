/**
 * Middleware de borda — xZark
 *
 * Responsabilidades:
 *  1. Honeypot: redireciona caminhos sondados por scanners (/wp-admin, /.env, etc.)
 *     para a rota /trap, atrasando e desperdiçando recursos do atacante.
 *  2. Route protection: rotas /admin exigem cookie de sessão; ausência → /unauthorized.
 *  3. Request ID: injeta header x-request-id correlacionável em logs e backend Go.
 *  4. Headers complementares dependentes de path (cache, etc.).
 *
 * Backend GoLang (futuro): este middleware injeta cabeçalhos `x-request-id`,
 * `x-forwarded-host` e `x-client-region` que o backend Go consome para tracing
 * distribuído (OpenTelemetry) e enforcement de rate limiting upstream.
 */
import { NextResponse, type NextRequest } from "next/server"

/** Caminhos comumente sondados por bots automatizados — armadilha. */
const HONEYPOT_PATTERNS: RegExp[] = [
  /^\/wp-admin/i,
  /^\/wp-login/i,
  /^\/wordpress/i,
  /^\/xmlrpc\.php/i,
  /^\/phpmyadmin/i,
  /^\/pma\b/i,
  /^\/administrator/i,
  /^\/admin\.php/i,
  /^\/admin-old/i,
  /^\/admin-panel/i,
  /^\/cpanel/i,
  /^\/\.env/i,
  /^\/\.git/i,
  /^\/\.aws/i,
  /^\/backup/i,
  /^\/\.well-known\/security\.txt$/i, // exceção: tratada abaixo
  /^\/config\.json$/i,
  /^\/dump\.sql$/i,
  /^\/server-status/i,
  /^\/actuator/i,
  /^\/_ignition/i,
]

/** security.txt é legítimo; não cair na armadilha. */
const ALLOWLIST: RegExp[] = [/^\/\.well-known\/security\.txt$/i]

/** Rotas que exigem sessão autenticada no frontend. */
const PROTECTED_PREFIXES = ["/admian"]

/** Gera um identificador único de requisição (ULID-like, sem dependência). */
function generateRequestId(): string {
  // Pseudo-ULID de 26 chars: timestamp (10) + aleatório (16). Suficiente para correlação.
  const ts = Date.now().toString(36).padStart(10, "0")
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(36).padStart(2, "0"))
    .join("")
    .slice(0, 16)
  return `req_${ts}${rand}`
}

/** Verifica se o caminho casa com algum padrão de honeypot. */
function isHoneypot(pathname: string): boolean {
  if (ALLOWLIST.some((re) => re.test(pathname))) return false
  return HONEYPOT_PATTERNS.some((re) => re.test(pathname))
}

/** Verifica presença mínima de cookie de sessão (validação real ocorre no backend Go). */
function hasSessionCookie(req: NextRequest): boolean {
  const session = req.cookies.get("xz_session")?.value
  // Só checa estrutura — assinatura JWT validada no backend.
  return Boolean(session && session.length > 32)
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const requestId = generateRequestId()

  // 1. Honeypot — rewrite (não redirect) preserva URL original nos logs.
  if (isHoneypot(pathname)) {
    const url = req.nextUrl.clone()
    url.pathname = "/trap"
    const res = NextResponse.rewrite(url)
    res.headers.set("x-request-id", requestId)
    res.headers.set("x-trap-hit", "1")
    return res
  }

  // 2. Proteção de rota — admin exige sessão.
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p))
  if (isProtected && !hasSessionCookie(req)) {
    const url = req.nextUrl.clone()
    url.pathname = "/unauthorized"
    url.searchParams.set("from", pathname)
    const res = NextResponse.redirect(url)
    res.headers.set("x-request-id", requestId)
    return res
  }

  // 3. Headers correlacionáveis pelo backend Go.
  const res = NextResponse.next()
  res.headers.set("x-request-id", requestId)
  res.headers.set("x-frame-options", "DENY")
  return res
}

export const config = {
  // Aplica em todas as rotas exceto assets estáticos e healthchecks.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/health).*)",
  ],
}
