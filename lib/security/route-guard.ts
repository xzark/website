/**
 * Route Guard — camada de compatibilidade (RSC).
 *
 * A lógica de autenticação foi consolidada em `lib/auth`. Este módulo agora
 * apenas reexporta a API para não quebrar consumidores existentes
 * (ex.: SecureWrapper) e mantém a nomenclatura histórica.
 *
 * Fonte única de verdade: `lib/auth/index.ts` (+ provider swapável para o
 * futuro backend Go/xAuth).
 */
import { getCurrentUser, hasRole, requireRole } from "@/lib/auth"
import type { PublicUser, UserRole } from "@/lib/auth/types"

export type { UserRole } from "@/lib/auth/types"
/** Mantém o nome histórico `SessionUser`, agora apontando para o perfil público. */
export type SessionUser = PublicUser

/** Valida a sessão a partir do cookie assinado. Null se não autenticado. */
export async function validateSession(): Promise<SessionUser | null> {
  return getCurrentUser()
}

/** Verifica se o usuário tem papel suficiente. */
export { hasRole }

/** Helper para Server Components: retorna o usuário ou redireciona. */
export async function requireRoleGuard(required: UserRole): Promise<SessionUser> {
  return requireRole(required)
}

// Reexport direto para compat com `import { requireRole } from ".../route-guard"`.
export { requireRole }
