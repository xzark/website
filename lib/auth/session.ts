/**
 * Sessão — emissão e verificação de JWT + gestão do cookie HttpOnly.
 *
 * O token é assinado com HS256 (jose) usando `AUTH_SECRET`. O cookie
 * `xz_session` é HttpOnly, SameSite=Lax, Secure em produção. A verificação
 * é edge-safe (jose funciona no runtime de borda), permitindo checagem no
 * middleware e nos Server Components.
 *
 * Backend Go (futuro): trocar `signSession`/`verifySessionToken` por chamadas
 * ao serviço xAuth mantendo o mesmo formato de claims (SessionClaims).
 */
import { SignJWT, jwtVerify } from "jose"
import type { SessionClaims, UserRole } from "./types"

/** Nome do cookie de sessão — reutilizado pelo middleware e route-guard. */
export const SESSION_COOKIE = "xz_session"

/** Duração da sessão: 7 dias. */
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7

const ISSUER = "xzark.co"
const AUDIENCE = "xzark:web"

function getSecret(): Uint8Array {
  const secret =
    process.env.AUTH_SECRET ||
    // Fallback apenas para desenvolvimento local — em produção, AUTH_SECRET é obrigatório.
    "dev-only-insecure-secret-change-me-in-production-xzark"
  return new TextEncoder().encode(secret)
}

/** Assina um JWT de sessão a partir das claims do usuário. */
export async function signSession(claims: SessionClaims): Promise<string> {
  return new SignJWT({ email: claims.email, role: claims.role, name: claims.name })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setSubject(claims.sub)
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret())
}

/** Verifica e decodifica um token de sessão. Retorna null se inválido/expirado. */
export async function verifySessionToken(token: string): Promise<SessionClaims | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
    })
    if (!payload.sub || typeof payload.email !== "string" || typeof payload.role !== "string") {
      return null
    }
    return {
      sub: payload.sub,
      email: payload.email,
      role: payload.role as UserRole,
      name: typeof payload.name === "string" ? payload.name : payload.email,
    }
  } catch {
    return null
  }
}

/** Opções padronizadas do cookie de sessão. */
export function sessionCookieOptions(maxAge: number = SESSION_MAX_AGE) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  }
}
