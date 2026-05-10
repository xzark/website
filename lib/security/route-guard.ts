/**
 * Route Guard — utilitários de proteção no servidor (RSC).
 *
 * Estes helpers são consumidos por Server Components e Route Handlers para:
 *  - Validar sessão via cookie (assinatura JWT futuramente verificada via Go).
 *  - Aplicar policies de papel (role-based) em rotas administrativas.
 *  - Carregar perfil mínimo do usuário sem expor PII para o client.
 *
 * Hoje retorna mocks; quando o backend Go estiver disponível, substituir
 * `validateSession` por chamada autenticada ao endpoint /v1/sessions/verify.
 */
import { cookies } from "next/headers"

export type UserRole = "guest" | "user" | "operator" | "admin" | "owner"

export interface SessionUser {
  id: string
  email: string
  role: UserRole
  mfa: boolean
  region: string
}

/**
 * Valida a sessão do usuário a partir do cookie HTTP-only `xz_session`.
 * Em produção: verifica assinatura JWT contra a chave pública distribuída pelo
 * backend Go (xAuth) e checa revogação via cache distribuído.
 */
export async function validateSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies()
  const session = cookieStore.get("xz_session")?.value
  if (!session || session.length < 32) return null

  // TODO: substituir por verificação real contra backend Go.
  // const res = await fetch(`${process.env.BACKEND_URL}/v1/sessions/verify`, {
  //   headers: { Authorization: `Bearer ${session}` },
  //   cache: "no-store",
  // })
  // if (!res.ok) return null
  // return await res.json()

  return {
    id: "usr_demo",
    email: "operator@xzark.co",
    role: "operator",
    mfa: true,
    region: "sa-east-1",
  }
}

/** Hierarquia de papéis (maior número = mais permissão). */
const ROLE_LEVEL: Record<UserRole, number> = {
  guest: 0,
  user: 1,
  operator: 2,
  admin: 3,
  owner: 4,
}

/** Verifica se o usuário tem papel suficiente para acessar uma rota. */
export function hasRole(user: SessionUser | null, required: UserRole): boolean {
  if (!user) return false
  return ROLE_LEVEL[user.role] >= ROLE_LEVEL[required]
}

/**
 * Helper para Server Components: retorna o usuário ou força redirect via throw.
 * Uso: `const user = await requireRole("admin")`.
 */
export async function requireRole(required: UserRole): Promise<SessionUser> {
  const { redirect } = await import("next/navigation")
  const user = await validateSession()
  if (!user) redirect("/unauthorized")
  if (!hasRole(user, required)) redirect("/unauthorized?reason=role")
  return user
}
