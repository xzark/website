import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { GridBackground } from "@/components/site/grid-background";
import { CTA } from "@/components/landing/cta";
import { Button } from "@/components/ui/button";
import { products, type ProductSlug } from "@/lib/site-config";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Gera rotas estáticas para todos os produtos */
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

/** Metadata dinâmica por produto */
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === (slug as ProductSlug));
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: `${product.name} — ${product.tagline}`,
    description: product.description,
  };
}

/**
 * Página de detalhe de produto
 * Slug dinâmico — renderiza informações completas, features e métricas.
 */
export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === (slug as ProductSlug));
  if (!product) notFound();

  const Icon = product.icon;
  const idx = products.findIndex((p) => p.slug === product.slug);
  const next = products[(idx + 1) % products.length];
  const prev = products[(idx - 1 + products.length) % products.length];

  return (
    <>
      <AnnouncementBar />
      <Header />
      <main>
        {/* Hero do produto */}
        <section className="relative overflow-hidden border-b border-border/60">
          <GridBackground />
          <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Todos os produtos
            </Link>

            <div className="mt-10 grid gap-10 md:grid-cols-12">
              <div className="md:col-span-7">
                <div className="flex items-center gap-3">
                  <div className="inline-flex size-11 items-center justify-center rounded-md border border-border/80 bg-card/80 backdrop-blur">
                    <Icon className="size-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                      {product.category}
                    </p>
                    <p className="text-sm font-medium">{product.name}</p>
                  </div>
                  <span
                    className={
                      "ml-2 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] " +
                      (product.status === "GA"
                        ? "border-success/30 bg-success/10 text-success"
                        : product.status === "Beta"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-muted text-muted-foreground")
                    }
                  >
                    {product.status}
                  </span>
                </div>

                <h1 className="mt-8 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
                  {product.tagline.split(" ").map((w, i, arr) =>
                    i === arr.length - 1 ? (
                      <span key={i} className="font-serif italic text-primary">
                        {" "}
                        {w}
                      </span>
                    ) : i === 0 ? (
                      <span key={i}>{w}</span>
                    ) : (
                      <span key={i}> {w}</span>
                    ),
                  )}
                </h1>

                <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                  {product.description}
                </p>

                <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    size="lg"
                    className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
                  >
                    <Link
                      href={
                        product.button?.link
                          ? product.button.link
                          : "/contact-sales"
                      }
                    >
                      {product.button?.text || "Solicitar demo"}
                      <ArrowUpRight className="ml-1 size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-11 rounded-md border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground hover:bg-accent/40"
                  >
                    <Link href="/services">Serviços relacionados</Link>
                  </Button>
                </div>
              </div>

              {/* Métricas em coluna lateral */}
              <div className="md:col-span-5">
                <div className="rounded-xl border border-border/80 bg-card/60 p-2 backdrop-blur">
                  <div className="rounded-lg border border-border/60 bg-background/50">
                    <div className="border-b border-border/60 px-5 py-3">
                      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                        Métricas operacionais
                      </p>
                    </div>
                    <div className="divide-y divide-border/60">
                      {product.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="flex items-baseline justify-between px-5 py-4"
                        >
                          <span className="text-sm text-muted-foreground">
                            {m.label}
                          </span>
                          <span className="font-sans text-base tabular-nums">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features detalhadas */}
        <section className="border-b border-border/60 bg-background py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 md:grid-cols-12">
              <div className="md:col-span-4">
                <div className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1 rounded-full bg-primary"
                  />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    Capacidades
                  </span>
                </div>
                <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                  Tudo que{" "}
                  <span className="font-serif italic">{product.name}</span>{" "}
                  entrega.
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Recursos production-grade testados em escala global, com SLAs
                  contratuais e suporte de engenharia 24/7.
                </p>
              </div>

              <div className="md:col-span-8">
                <ul className="grid grid-cols-1 gap-px overflow-hidden border border-border/60 sm:grid-cols-2">
                  {product.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 bg-card px-5 py-5"
                      style={{ boxShadow: "0 0 0 1px var(--border)" }}
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm leading-relaxed text-foreground/90">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing dinâmico baseado no product.pricing */}
        {product.pricing && (
          <section
            id="pricing"
            className="border-b border-border/60 bg-background py-20"
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2">
                  <span
                    aria-hidden
                    className="size-1 rounded-full bg-primary"
                  />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    Pricing
                  </span>
                </div>

                <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl">
                  Planos para qualquer escala.
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Escolha o plano ideal para seu ambiente e escale conforme seu
                  produto cresce.
                </p>
              </div>

              <div className="mt-12 grid gap-6 lg:grid-cols-3">
                {product.pricing.map((plan) => (
                  <div
                    key={plan.name}
                    className={
                      plan.highlight
                        ? "relative rounded-2xl border border-primary/40 bg-card p-6 shadow-2xl shadow-primary/10"
                        : "rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur"
                    }
                  >
                    {/* Badge */}
                    {plan.badge && (
                      <div
                        className={
                          plan.highlight
                            ? "absolute right-4 top-4 rounded-full bg-primary px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground"
                            : "rounded-full border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground inline-flex"
                        }
                      >
                        {plan.badge}
                      </div>
                    )}

                    {/* Header */}
                    <div>
                      <h3 className="text-xl font-medium">{plan.name}</h3>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mt-8">
                      <span className="text-4xl font-semibold">
                        {plan.price}
                      </span>
                    </div>

                    {/* Features */}
                    <ul className="mt-8 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" />

                          <span className="text-sm leading-relaxed text-foreground/90">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Button
                      className={
                        plan.highlight
                          ? "mt-8 w-full rounded-md bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
                          : "mt-8 w-full rounded-md cursor-pointer"
                      }
                      variant={plan.highlight ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Navegação entre produtos */}
        <section className="border-b border-border/60 bg-background py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Link
                href={`/products/${prev.slug}`}
                className="group rounded-lg border border-border/80 bg-card p-5 transition-colors hover:border-primary/40"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  Produto anterior
                </p>
                <p className="mt-2 flex items-center gap-2 text-base font-medium">
                  <ArrowLeft className="size-4 text-primary transition-transform group-hover:-translate-x-0.5" />
                  {prev.name}
                </p>
              </Link>
              <Link
                href={`/products/${next.slug}`}
                className="group rounded-lg border border-border/80 bg-card p-5 text-right transition-colors hover:border-primary/40"
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  Próximo produto
                </p>
                <p className="mt-2 flex items-center justify-end gap-2 text-base font-medium">
                  {next.name}
                  <ArrowUpRight className="size-4 text-primary transition-transform group-hover:translate-x-0.5" />
                </p>
              </Link>
            </div>
          </div>
        </section>

        <CTA />
      </main>
      <Footer />
    </>
  );
}
