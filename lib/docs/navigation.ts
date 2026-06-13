/**
 * Estrutura de navegação da documentação xZark.
 *
 * Fonte única de verdade para a sidebar, o paginador (anterior/próximo)
 * e a geração de rotas estáticas. Para adicionar uma nova página basta
 * incluir um item aqui e registrar o conteúdo em `lib/docs/content`.
 */

export interface DocNavItem {
  title: string
  /** Segmentos de URL após `/docs`. Vazio = página inicial da documentação. */
  slug: string[]
  /** Rótulo curto opcional exibido à direita do item (ex: "Novo", "Beta"). */
  badge?: string
}

export interface DocNavGroup {
  /** Título do grupo exibido na sidebar. */
  label: string
  items: DocNavItem[]
}

export const docsNavigation: DocNavGroup[] = [
  {
    label: "Começar",
    items: [
      { title: "Introdução", slug: [] },
      { title: "Guia rápido", slug: ["guia-rapido"] },
      { title: "Instalação", slug: ["instalacao"] },
      { title: "Configuração", slug: ["configuracao"] },
    ],
  },
  {
    label: "Fundamentos",
    items: [
      { title: "Conceitos principais", slug: ["conceitos"] },
      { title: "Exemplos práticos", slug: ["exemplos"] },
      { title: "Referência técnica", slug: ["referencia"] },
    ],
  },
  {
    label: "xVault",
    items: [
      { title: "Visão geral", slug: ["xvault"] },
      { title: "Gerenciar segredos", slug: ["xvault", "segredos"] },
      { title: "Variáveis de ambiente", slug: ["xvault", "variaveis-de-ambiente"] },
      { title: "Rotação de segredos", slug: ["xvault", "rotacao"] },
      { title: "Audit logs", slug: ["xvault", "audit-logs"] },
      { title: "Tratamento de erros", slug: ["xvault", "erros"] },
    ],
  },
  {
    label: "xAuth",
    items: [
      { title: "Visão geral", slug: ["xauth"] },
    ],
  },
  {
    label: "Recursos",
    items: [
      { title: "FAQ", slug: ["faq"] },
      { title: "Changelog", slug: ["changelog"] },
    ],
  },
]

/** Converte um array de slug em uma chave estável do registro de conteúdo. */
export function slugToKey(slug: string[]): string {
  return slug.join("/")
}

/** Converte um array de slug em href absoluto. */
export function slugToHref(slug: string[]): string {
  return slug.length === 0 ? "/docs" : `/docs/${slug.join("/")}`
}

/** Lista plana de todos os itens, na ordem da sidebar. Usado pelo paginador. */
export function flattenNavigation(): DocNavItem[] {
  return docsNavigation.flatMap((group) => group.items)
}

/** Retorna o grupo (seção) ao qual um item pertence. */
export function findGroupLabel(slug: string[]): string | undefined {
  const key = slugToKey(slug)
  return docsNavigation.find((group) =>
    group.items.some((item) => slugToKey(item.slug) === key),
  )?.label
}

/** Retorna os itens anterior e próximo de uma página, em ordem linear. */
export function getAdjacentItems(slug: string[]): {
  previous?: DocNavItem
  next?: DocNavItem
} {
  const flat = flattenNavigation()
  const key = slugToKey(slug)
  const index = flat.findIndex((item) => slugToKey(item.slug) === key)

  if (index === -1) return {}

  return {
    previous: index > 0 ? flat[index - 1] : undefined,
    next: index < flat.length - 1 ? flat[index + 1] : undefined,
  }
}

/** Todos os slugs registrados — usado por `generateStaticParams`. */
export function allDocSlugs(): string[][] {
  return flattenNavigation().map((item) => item.slug)
}
