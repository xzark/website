/**
 * Tipos centrais da camada de autenticação — xZark.
 *
 * Modelo de papéis (roles) simples e hierárquico:
 *   viewer (1) < developer (2) < admin (3)
 *
 * Toda a autorização do app deriva desta hierarquia. Ao integrar o backend
 * Go (xAuth), estes tipos permanecem estáveis — apenas o `AuthProvider`
 * (lib/auth/provider.ts) troca de implementação.
 */

export type UserRole = "viewer" | "developer" | "admin"

/** Peso de cada papel — maior número = mais permissão. */
export const ROLE_LEVEL: Record<UserRole, number> = {
  viewer: 1,
  developer: 2,
  admin: 3,
}

/** Rótulos legíveis (pt-BR) para exibição na UI. */
export const ROLE_LABEL: Record<UserRole, string> = {
  viewer: "Viewer",
  developer: "Developer",
  admin: "Admin",
}

/**
 * Registro completo de usuário (server-side). Nunca serializado para o client
 * em sua forma bruta — usar `PublicUser` para exposição.
 */
export interface UserRecord {
  id: string
  email: string
  name: string
  role: UserRole
  /** Hash PBKDF2 no formato `pbkdf2$iter$saltB64$hashB64`. */
  passwordHash: string
  mfa: boolean
  region: string
  createdAt: string
}

/** Perfil mínimo seguro para expor a Server/Client Components. */
export interface PublicUser {
  id: string
  email: string
  name: string
  role: UserRole
  mfa: boolean
  region: string
}

/** Payload persistido no JWT de sessão (cookie HttpOnly). */
export interface SessionClaims {
  sub: string
  email: string
  role: UserRole
  name: string
}

/** Chave de API pertencente a um usuário. */
export interface ApiKeyRecord {
  id: string
  userId: string
  name: string
  /** Prefixo público exibível (ex.: `xz_live_a1b2`). */
  prefix: string
  /** Somente os últimos 4 chars são exibidos; o valor completo nunca é rearmazenado. */
  last4: string
  scopes: string[]
  createdAt: string
  lastUsedAt: string | null
  revokedAt: string | null
}

/** Converte um registro completo em perfil público. */
export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    mfa: user.mfa,
    region: user.region,
  }
}
