/**
 * Schemas de validação (zod) compartilhados entre client (react-hook-form)
 * e server (server actions). Mantém a validação como fonte única de verdade.
 */
import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().min(1, "Informe seu e-mail").email("E-mail inválido"),
  password: z.string().min(1, "Informe sua senha"),
})

export type LoginInput = z.infer<typeof loginSchema>

export const AVAILABLE_SCOPES = [
  "auth:read",
  "auth:write",
  "vault:read",
  "vault:write",
  "admin:read",
] as const

export const createApiKeySchema = z.object({
  name: z
    .string()
    .min(2, "Nome muito curto")
    .max(48, "Máximo de 48 caracteres"),
  scopes: z
    .array(z.enum(AVAILABLE_SCOPES))
    .min(1, "Selecione ao menos um escopo"),
})

export type CreateApiKeyInput = z.infer<typeof createApiKeySchema>
