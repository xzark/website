import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { DocsPage } from "@/components/docs/docs-page"
import { getDocContent } from "@/lib/docs/registry"
import {
  allDocSlugs,
  getAdjacentItems,
  slugToHref,
} from "@/lib/docs/navigation"

type Params = Promise<{ slug?: string[] }>

export function generateStaticParams() {
  return allDocSlugs().map((slug) => ({
    slug: slug.length === 0 ? undefined : slug,
  }))
}

export async function generateMetadata({
  params,
}: {
  params: Params
}): Promise<Metadata> {
  const { slug = [] } = await params
  const doc = getDocContent(slug)

  if (!doc) return {}

  return {
    title: `${doc.title} | Documentação xZark`,
    description: doc.description,
  }
}

export default async function DocsCatchAllPage({
  params,
}: {
  params: Params
}) {
  const { slug = [] } = await params
  const doc = getDocContent(slug)

  if (!doc) notFound()

  const { previous, next } = getAdjacentItems(slug)

  return (
    <DocsPage
      eyebrow={doc.eyebrow}
      title={doc.title}
      description={doc.description}
      updatedAt={doc.updatedAt}
      sections={doc.sections}
      previousPage={
        previous
          ? { title: previous.title, href: slugToHref(previous.slug) }
          : undefined
      }
      nextPage={
        next ? { title: next.title, href: slugToHref(next.slug) } : undefined
      }
    />
  )
}
