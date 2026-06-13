import type { DocContent, DocRegistry } from "@/lib/docs/types"
import { slugToKey } from "@/lib/docs/navigation"
import {
  configuracao,
  guiaRapido,
  instalacao,
  introducao,
} from "@/lib/docs/content/getting-started"
import {
  conceitos,
  exemplos,
  referencia,
} from "@/lib/docs/content/fundamentals"
import {
  xvaultAuditLogs,
  xvaultEnv,
  xvaultErrors,
  xvaultOverview,
  xvaultRotation,
  xvaultSecrets,
} from "@/lib/docs/content/xvault"
import { xauthOverview } from "@/lib/docs/content/xauth"
import { changelog, faq } from "@/lib/docs/content/resources"

/**
 * Registro de conteúdo da documentação.
 * A chave corresponde a `slugToKey(slug)` definido na navegação.
 */
export const docsRegistry: DocRegistry = {
  // Começar
  "": introducao,
  "guia-rapido": guiaRapido,
  instalacao: instalacao,
  configuracao: configuracao,

  // Fundamentos
  conceitos: conceitos,
  exemplos: exemplos,
  referencia: referencia,

  // xVault
  xvault: xvaultOverview,
  "xvault/segredos": xvaultSecrets,
  "xvault/variaveis-de-ambiente": xvaultEnv,
  "xvault/rotacao": xvaultRotation,
  "xvault/audit-logs": xvaultAuditLogs,
  "xvault/erros": xvaultErrors,

  // xAuth
  xauth: xauthOverview,

  // Recursos
  faq: faq,
  changelog: changelog,
}

export function getDocContent(slug: string[]): DocContent | null {
  return docsRegistry[slugToKey(slug)] ?? null
}
