/**
 * API pública da camada de autenticação — uso em Server Components,
 * Route Handlers e Server Actions.
 *
 * Fonte única de verdade para "quem é o usuário atual e o que ele pode fazer".
 * O middleware faz o gate de borda (barato); estes helpers fazem o gate fino
 * no servidor com verificação de assinatura + resolução do registro completo.
 */
import "server-only"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { getAuthProvider } from "./provider"
import { SESSION_COOKIE, verifySessionToken } from "./session"
import { ROLE_LEVEL, toPublicUser, type PublicUser, type UserRole } from "./types"

/** Lê o cookie de sessão e resolve o perfil público. Null se não autenticado. */
export async function getCurrentUser(): Promise<PublicUser | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  if (!token) return null

  const claims = await verifySessionToken(token)
  if (!claims) return null

  // Reidrata o registro para garantir que papel/perfil estão atualizados.
  const user = await getAuthProvider().getUserById(claims.sub)
  return user ? toPublicUser(user) : null
}

/** True se `user` tem papel igual ou superior a `required`. */
export function hasRole(user: PublicUser | null, required: UserRole): boolean {
  if (!user) return false
  return ROLE_LEVEL[user.role] >= ROLE_LEVEL[required]
}

/**
 * Exige sessão autenticada. Redireciona para /login preservando o destino.
 * `from` deve ser o pathname atual (ex.: passado pela página).
 */
export async function requireUser(from?: string): Promise<PublicUser> {
  const user = await getCurrentUser()
  if (!user) {
    redirect(from ? `/login?from=${encodeURIComponent(from)}` : "/login")
  }
  return user
}

/** Exige papel mínimo. Redireciona para /login ou /unauthorized conforme o caso. */
export async function requireRole(required: UserRole, from?: string): Promise<PublicUser> {
  const user = await getCurrentUser()
  if (!user) {
    redirect(from ? `/login?from=${encodeURIComponent(from)}` : "/login")
  }
  if (!hasRole(user, required)) {
    redirect("/unauthorized?reason=role")
  }
  return user
}

export type { PublicUser, UserRole } from "./types"
export { ROLE_LABEL, ROLE_LEVEL } from "./types"
