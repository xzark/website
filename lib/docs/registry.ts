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
import { xauthOverview, xshieldOverview } from "@/lib/docs/content/xauth"
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

  // Produtos
  xauth: xauthOverview,
  xshield: xshieldOverview,

  // Recursos
  faq: faq,
  changelog: changelog,
}

export function getDocContent(slug: string[]): DocContent | null {
  return docsRegistry[slugToKey(slug)] ?? null
}
