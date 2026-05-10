import type { LucideIcon } from "lucide-react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  label: string
  value: string
  delta?: string
  trend?: "up" | "down" | "neutral"
  icon: LucideIcon
  spark?: number[]
}

export function MetricCard({ label, value, delta, trend = "neutral", icon: Icon, spark }: MetricCardProps) {
  const trendColor =
    trend === "up" ? "text-success" : trend === "down" ? "text-destructive" : "text-muted-foreground"

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-xl transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {label}
          </p>
          <p className="mt-3 font-serif text-3xl font-light tracking-tight text-foreground">
            {value}
          </p>
        </div>
        <div className="flex size-9 items-center justify-center rounded-md border border-border/60 bg-background/60">
          <Icon className="size-4 text-primary" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        {delta && (
          <div className={cn("flex items-center gap-1 font-mono text-xs", trendColor)}>
            {trend === "up" && <ArrowUpRight className="size-3" />}
            {trend === "down" && <ArrowDownRight className="size-3" />}
            <span>{delta}</span>
          </div>
        )}
        {spark && (
          <svg
            viewBox={`0 0 ${spark.length * 8} 24`}
            className="h-6 flex-1 text-primary/70"
            preserveAspectRatio="none"
            aria-hidden
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={spark
                .map((v, i) => `${i * 8},${24 - (v / Math.max(...spark)) * 22}`)
                .join(" ")}
            />
          </svg>
        )}
      </div>
    </div>
  )
}
