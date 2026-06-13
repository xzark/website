"use client"

/**
 * Índice da página (TOC) com scroll-spy.
 * Observa as seções e destaca a ativa conforme o scroll.
 */
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export interface TocItem {
  id: string
  title: string
}

export function DocsToc({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActiveId(visible[0].target.id)
        }
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (items.length === 0) return null

  return (
    <div className="sticky top-24">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
        Nesta página
      </p>
      <nav aria-label="Índice da página" className="mt-4 space-y-1.5">
        {items.map((item) => {
          const active = activeId === item.id
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "block border-l-2 py-0.5 pl-3 text-[13px] transition-colors",
                active
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {item.title}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
