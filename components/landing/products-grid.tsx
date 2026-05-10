/**
 * ProductsGrid — bento grid premium dos 5 produtos xZark.
 * Card destaque (xAuth) + 4 cards secundários, todos linkáveis.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { products } from "@/lib/site-config"
import { SectionHeader } from "@/components/site/section-header"
import { cn } from "@/lib/utils"

export function ProductsGrid() {
  const [featured, ...rest] = products

  return (
    <section
      aria-labelledby="produtos-heading"
      className="relative border-b border-border/60 bg-background py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader
            eyebrow="Plataforma"
            title={
              <>
                Cinco produtos. <span className="font-serif italic text-primary">Uma</span> infraestrutura.
              </>
            }
            description="Cada produto resolve uma camada da pilha de segurança. Juntos, formam uma plataforma zero-trust completa, com SLAs unificados e auditoria centralizada."
          />
          <Link
            href="/products"
            className="inline-flex items-center gap-1 self-start text-sm text-foreground transition-colors hover:text-primary md:self-auto"
          >
            Ver todos os produtos
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {/* Card destaque */}
          <ProductCard product={featured} className="lg:col-span-2 lg:row-span-2" featured />
          {rest.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({
  product,
  className,
  featured,
}: {
  product: (typeof products)[number]
  className?: string
  featured?: boolean
}) {
  const Icon = product.icon
  return (
    <Link
      href={`/products/${product.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-colors",
        "hover:border-primary/40",
        className,
      )}
    >
      {featured && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top right, oklch(0.72 0.18 245 / 0.18), transparent 60%)",
          }}
        />
      )}

      <div className="relative flex flex-1 flex-col p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="inline-flex size-9 items-center justify-center rounded-md border border-border/80 bg-background/60">
              <Icon className="size-4 text-primary" />
            </div>
            <div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                {product.category}
              </p>
              <h3 className="text-base font-medium tracking-tight text-foreground">
                {product.name}
              </h3>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
              product.status === "GA"
                ? "border-success/30 bg-success/10 text-success"
                : product.status === "Beta"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border bg-muted text-muted-foreground",
            )}
          >
            {product.status}
          </span>
        </div>

        <p
          className={cn(
            "mt-6 text-pretty text-foreground/90",
            featured ? "text-2xl leading-snug md:text-3xl" : "text-base",
          )}
        >
          {product.tagline}
        </p>

        {featured && (
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>
        )}

        <div className="mt-auto pt-8">
          {featured ? (
            <div className="grid grid-cols-3 gap-6 border-t border-border/60 pt-6">
              {product.metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {m.label}
                  </p>
                  <p className="mt-1 font-sans text-lg tabular-nums text-foreground">
                    {m.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-1 text-xs text-muted-foreground transition-colors group-hover:text-primary">
              Saiba mais
              <ArrowUpRight className="size-3.5" />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
