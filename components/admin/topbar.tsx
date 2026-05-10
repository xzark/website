"use client"

import { Bell, Command, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AdminTopbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-4 backdrop-blur-xl md:px-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar eventos, IPs, usuários..."
          className="h-9 border-border/60 bg-card/40 pl-9 pr-16 font-mono text-xs"
          aria-label="Buscar"
        />
        <kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 rounded border border-border/60 bg-card/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground md:flex">
          <Command className="size-3" />K
        </kbd>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-md border border-border/60 bg-card/40 px-3 py-1.5 md:flex">
          <span className="size-1.5 rounded-full bg-success shadow-[0_0_6px_var(--success)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Live · BR-SP1
          </span>
        </div>

        <Button variant="ghost" size="icon" className="relative size-9" aria-label="Notificações">
          <Bell className="size-4" strokeWidth={1.5} />
          <span className="absolute right-2 top-2 size-1.5 rounded-full bg-warning shadow-[0_0_6px_var(--warning)]" />
        </Button>

        <div className="flex items-center gap-2 rounded-md border border-border/60 bg-card/40 px-2 py-1.5">
          <div className="flex size-7 items-center justify-center rounded bg-primary/10 font-mono text-xs text-primary">
            A
          </div>
          <div className="hidden flex-col text-left md:flex">
            <span className="text-xs font-medium leading-none">Admin</span>
            <span className="font-mono text-[10px] text-muted-foreground">root@xzark</span>
          </div>
        </div>
      </div>
    </header>
  )
}
