import { regions } from "@/lib/admin-data"
import { cn } from "@/lib/utils"

export function RegionsStatus() {
  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Edge regions
      </p>
      <h3 className="mt-2 font-serif text-2xl font-light tracking-tight">
        Status <span className="italic text-primary">global</span>
      </h3>

      <ul className="mt-5 flex flex-col gap-3">
        {regions.map((r) => (
          <li key={r.code} className="flex items-center gap-3">
            <span
              className={cn(
                "size-1.5 shrink-0 rounded-full",
                r.status === "healthy"
                  ? "bg-success shadow-[0_0_6px_var(--success)]"
                  : "bg-warning shadow-[0_0_6px_var(--warning)]",
              )}
              aria-hidden
            />
            <div className="flex flex-1 items-center gap-3">
              <span className="font-mono text-xs text-foreground/80 w-16">{r.code}</span>
              <span className="text-xs text-muted-foreground">{r.city}</span>
              <div className="ml-auto flex items-center gap-3">
                <div className="h-1 w-24 overflow-hidden rounded-full bg-background/60">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      r.load > 75 ? "bg-warning" : "bg-primary",
                    )}
                    style={{ width: `${r.load}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] tabular-nums text-muted-foreground w-8 text-right">
                  {r.load}%
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
