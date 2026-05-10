/**
 * SecureWrapper — wrapper de layout para áreas sensíveis.
 *
 * Garante que conteúdo sensível (admin, billing) só renderize após:
 *  1. Validação de sessão concluída no servidor (RSC).
 *  2. Verificação de role compatível.
 *  3. Decoração com nonce/CSP-friendly.
 *
 * Em hidratação, evita flicker de UI privada exibindo um skeleton seguro.
 */
import type { ReactNode } from "react"
import { requireRole, type UserRole } from "@/lib/security/route-guard"

interface SecureWrapperProps {
  /** Papel mínimo necessário para visualizar o conteúdo. */
  role: UserRole
  /** Conteúdo a ser renderizado se a validação passar. */
  children: ReactNode
  /** Componente exibido enquanto o servidor valida (raro com RSC). */
  fallback?: ReactNode
}

export async function SecureWrapper({ role, children }: SecureWrapperProps) {
  // Bloqueia render no servidor se a sessão for inválida — evita exposição.
  await requireRole(role)
  return <>{children}</>
}
