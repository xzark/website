import { Activity, Globe, Shield, Users } from "lucide-react"
import { MetricCard } from "@/components/admin/metric-card"
import { TrafficChart } from "@/components/admin/traffic-chart"
import { ThreatsBreakdown } from "@/components/admin/threats-breakdown"
import { ThreatsFeed } from "@/components/admin/threats-feed"
import { RegionsStatus } from "@/components/admin/regions-status"

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Security Operations Center
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light tracking-tight md:text-5xl">
            Visão <span className="italic text-primary">geral</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          Janela · 24h · UTC-3
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Requisições / 24h"
          value="14.2M"
          delta="+12.4%"
          trend="up"
          icon={Activity}
          spark={[12, 18, 14, 22, 19, 26, 24, 30, 28, 34, 32, 38]}
        />
        <MetricCard
          label="Ameaças bloqueadas"
          value="38.7K"
          delta="+4.1%"
          trend="up"
          icon={Shield}
          spark={[8, 10, 9, 14, 16, 13, 18, 17, 22, 20, 24, 28]}
        />
        <MetricCard
          label="Usuários ativos"
          value="2,418"
          delta="-1.8%"
          trend="down"
          icon={Users}
          spark={[24, 26, 25, 24, 23, 25, 24, 23, 22, 23, 22, 21]}
        />
        <MetricCard
          label="Latência p99"
          value="11ms"
          delta="-0.3ms"
          trend="up"
          icon={Globe}
          spark={[14, 13, 15, 14, 13, 12, 13, 12, 11, 12, 11, 11]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TrafficChart />
        </div>
        <RegionsStatus />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ThreatsBreakdown />
        <div className="lg:col-span-2">
          <ThreatsFeed limit={5} />
        </div>
      </div>
    </div>
  )
}
