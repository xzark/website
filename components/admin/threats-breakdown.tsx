"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { threatTypes } from "@/lib/admin-data"

export function ThreatsBreakdown() {
  const total = threatTypes.reduce((acc, t) => acc + t.value, 0)

  return (
    <div className="rounded-lg border border-border/60 bg-card/40 p-5 backdrop-blur-xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        Distribuição de ameaças
      </p>
      <h3 className="mt-2 font-serif text-2xl font-light tracking-tight">
        Vetores <span className="italic text-primary">ativos</span>
      </h3>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center">
        <div className="relative h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={threatTypes}
                dataKey="value"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={2}
                stroke="var(--card)"
                strokeWidth={2}
              >
                {threatTypes.map((t) => (
                  <Cell key={t.name} fill={t.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Total
            </span>
            <span className="font-serif text-2xl font-light">{total}%</span>
          </div>
        </div>

        <ul className="flex flex-col gap-2.5">
          {threatTypes.map((t) => (
            <li key={t.name} className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2.5">
                <span
                  className="size-2.5 rounded-sm"
                  style={{ backgroundColor: t.color }}
                  aria-hidden
                />
                <span className="text-foreground/80">{t.name}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground">{t.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
