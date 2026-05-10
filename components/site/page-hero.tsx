/**
 * PageHero — hero compacto reutilizado em páginas internas.
 * Mantém consistência visual: eyebrow + headline serif/sans + descrição.
 */
import { GridBackground } from "./grid-background"

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description?: string
  meta?: { label: string; value: string }[]
}

export function PageHero({ eyebrow, title, description, meta }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <GridBackground />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
        <div className="inline-flex items-center gap-2">
          <span aria-hidden className="size-1 rounded-full bg-primary" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>
        <h1 className="mt-6 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
        {meta && meta.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden border border-border/60 md:grid-cols-4">
            {meta.map((m) => (
              <div
                key={m.label}
                className="bg-card px-5 py-5"
                style={{ boxShadow: "0 0 0 1px var(--border)" }}
              >
                <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                  {m.label}
                </p>
                <p className="mt-2 font-sans text-xl tabular-nums">{m.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
