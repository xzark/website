import { AlertTriangle, Ban, Eye, ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"
import { MetricCard } from "@/components/admin/metric-card"
import { ThreatsFeed } from "@/components/admin/threats-feed"
import { ThreatsBreakdown } from "@/components/admin/threats-breakdown"

export default function ThreatsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            xShield · Threat Operations
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light tracking-tight md:text-5xl">
            Ameaças <span className="italic text-primary">em tempo real</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Monitoramento contínuo de eventos suspeitos detectados em todas as regiões da edge.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="border-border/60 bg-card/40">
            Exportar CSV
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Criar regra
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Críticas / 24h"
          value="148"
          delta="+22"
          trend="down"
          icon={ShieldAlert}
          spark={[2, 4, 3, 6, 5, 8, 7, 10, 9, 12, 11, 14]}
        />
        <MetricCard
          label="IPs bloqueados"
          value="6,382"
          delta="+318"
          trend="up"
          icon={Ban}
          spark={[10, 12, 14, 13, 16, 18, 17, 20, 22, 24, 23, 26]}
        />
        <MetricCard
          label="Investigando"
          value="42"
          delta="-3"
          trend="up"
          icon={Eye}
          spark={[8, 10, 9, 8, 9, 7, 8, 7, 6, 7, 6, 5]}
        />
        <MetricCard
          label="Alertas abertos"
          value="9"
          delta="+1"
          trend="down"
          icon={AlertTriangle}
          spark={[4, 5, 4, 6, 5, 7, 6, 8, 7, 9, 8, 9]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ThreatsBreakdown />
        <div className="lg:col-span-2">
          <ThreatsFeed />
        </div>
      </div>
    </div>
  )
}
