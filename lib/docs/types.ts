import type * as React from "react"

export interface DocSection {
  id: string
  title: string
  content: React.ReactNode
}

export interface DocContent {
  /** Rótulo curto exibido como eyebrow (geralmente o nome do grupo). */
  eyebrow: string
  title: string
  description: string
  /** Data da última atualização (ISO ou texto). Opcional. */
  updatedAt?: string
  sections: DocSection[]
}

export type DocRegistry = Record<string, DocContent>
