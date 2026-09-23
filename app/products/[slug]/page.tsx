import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { Header } from "@/components/site/header"
import { Footer } from "@/components/site/footer"
import { GridBackground } from "@/components/site/grid-background"
import { CTA } from "@/components/landing/cta"
import { Button } from "@/components/ui/button"
import { products, type ProductSlug } from "@/lib/site-config"

interface ProductPageProps { params: Promise<{ slug: string }> }
export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })) }
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> { const { slug } = await params; const product = products.find((item) => item.slug === slug); return product ? { title: `${product.name} — ${product.tagline}`, description: product.description } : { title: "Produto não encontrado" } }

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = products.find((item) => item.slug === (slug as ProductSlug))
  if (!product) notFound()
  const Icon = product.icon
  return <><AnnouncementBar /><Header /><main><section className="relative overflow-hidden border-b border-border/60"><GridBackground /><div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24"><Link href="/products" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft className="size-3.5" />Todos os produtos</Link><div className="mt-10 grid gap-10 md:grid-cols-12"><div className="md:col-span-8"><div className="flex items-center gap-3"><div className="inline-flex size-11 items-center justify-center rounded-md border border-border/80 bg-card/80"><Icon className="size-5 text-primary" /></div><div><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">{product.category}</p><p className="text-sm font-medium">{product.name}</p></div><span className="rounded-full border border-border bg-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{product.status}</span></div><h1 className="mt-8 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">{product.tagline}</h1><p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">{product.description}</p><Button asChild size="lg" className="mt-8 h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"><Link href="/contact">Falar sobre o conceito <ArrowUpRight className="ml-1 size-4" /></Link></Button></div><div className="md:col-span-4"><div className="rounded-xl border border-border/80 bg-card/60 p-6"><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">Estado</p><p className="mt-4 text-2xl font-medium tracking-tight">{product.status}</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Este produto é apresentado como conceito e está sujeito a evolução.</p></div></div></div></div></section><section className="border-b border-border/60 bg-background py-20"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><div className="grid gap-10 md:grid-cols-12"><div className="md:col-span-4"><p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">Escopo conceitual</p><h2 className="mt-4 text-3xl font-medium leading-tight tracking-tight md:text-4xl">O que estamos <span className="font-serif italic">explorando</span>.</h2><p className="mt-4 text-sm leading-relaxed text-muted-foreground">Capacidades que fazem parte da visão atual para {product.name}, sem afirmar disponibilidade operacional.</p></div><div className="md:col-span-8"><ul className="grid grid-cols-1 gap-px overflow-hidden border border-border/60 sm:grid-cols-2">{product.features.map((feature) => <li key={feature} className="flex items-start gap-3 bg-card px-5 py-5" style={{ boxShadow: "0 0 0 1px var(--border)" }}><Check className="mt-0.5 size-4 shrink-0 text-primary" /><span className="text-sm leading-relaxed text-foreground/90">{feature}</span></li>)}</ul></div></div></div></section><CTA /></main><Footer /></>
}
