import { recentThreats } from "@/lib/admin-data"
import { cn } from "@/lib/utils"

const severityClasses: Record<string, string> = {
  critical: "bg-destructive/15 text-destructive border-destructive/30",
  high: "bg-warning/15 text-warning border-warning/30",
  medium: "bg-primary/15 text-primary border-primary/30",
  low: "bg-muted/40 text-muted-foreground border-border",
}

const actionClasses: Record<string, string> = {
  blocked: "text-destructive",
  mitigated: "text-warning",
  alerted: "text-primary",
}

export function ThreatsFeed({ limit }: { limit?: number }) {
  const items = limit ? recentThreats.slice(0, limit) : recentThreats

  return (
    <div className="overflow-hidden rounded-lg border border-border/60 bg-card/40 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-border/60 px-5 py-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Live feed
          </p>
          <h3 className="mt-1 font-serif text-xl font-light tracking-tight">
            Eventos <span className="italic text-primary">recentes</span>
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded border border-border/60 bg-background/40 px-2.5 py-1">
          <span className="size-1.5 animate-pulse rounded-full bg-success" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Streaming
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <th className="px-5 py-3 font-normal">Hora</th>
              <th className="px-5 py-3 font-normal">Tipo</th>
              <th className="px-5 py-3 font-normal">Severidade</th>
              <th className="px-5 py-3 font-normal">Origem</th>
              <th className="px-5 py-3 font-normal">Alvo</th>
              <th className="px-5 py-3 font-normal">Ação</th>
            </tr>
          </thead>
          <tbody>
            {items.map((evt) => (
              <tr
                key={evt.id}
                className="border-b border-border/40 transition-colors hover:bg-card/60"
              >
                <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                  {evt.timestamp}
                </td>
                <td className="px-5 py-3">{evt.type}</td>
                <td className="px-5 py-3">
                  <span
                    className={cn(
                      "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      severityClasses[evt.severity],
                    )}
                  >
                    {evt.severity}
                  </span>
                </td>
                <td className="px-5 py-3 font-mono text-xs">
                  <span className="text-foreground/80">{evt.source}</span>
                  <span className="ml-2 text-muted-foreground">[{evt.country}]</span>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-foreground/80">{evt.target}</td>
                <td className={cn("px-5 py-3 font-mono text-xs uppercase", actionClasses[evt.action])}>
                  {evt.action}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
