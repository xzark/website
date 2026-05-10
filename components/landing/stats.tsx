/**
 * Stats — métricas globais da plataforma.
 * Layout em grade com tipografia tabular, sem decoração desnecessária.
 */
import { globalStats } from "@/lib/site-config"

export function Stats() {
  return (
    <section
      aria-label="Métricas globais"
      className="border-b border-border/60 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-px overflow-hidden border-x border-border/60 lg:grid-cols-4">
          {globalStats.map((s, i) => (
            <div
              key={s.label}
              className="relative bg-background p-6 md:p-8"
              style={{
                boxShadow:
                  i === 0
                    ? "0 0 0 0 transparent"
                    : "-1px 0 0 0 var(--border), 0 -1px 0 0 var(--border)",
              }}
            >
              <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </p>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-sans text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
                  {s.value}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {s.suffix}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
