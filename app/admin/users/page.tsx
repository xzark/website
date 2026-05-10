import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { users } from "@/lib/admin-data"
import { cn } from "@/lib/utils"

const statusClasses: Record<string, string> = {
  active: "bg-success/15 text-success border-success/30",
  suspended: "bg-destructive/15 text-destructive border-destructive/30",
  pending: "bg-warning/15 text-warning border-warning/30",
}

export default function UsersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            xAuth · Identity & Access
          </p>
          <h1 className="mt-2 font-serif text-4xl font-light tracking-tight md:text-5xl">
            Identidades <span className="italic text-primary">autorizadas</span>
          </h1>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          <Plus className="size-4" strokeWidth={1.5} />
          Convidar usuário
        </Button>
      </div>

      <div className="rounded-lg border border-border/60 bg-card/40 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-3 border-b border-border/60 p-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, email ou ID..."
              className="h-9 border-border/60 bg-background/40 pl-9 font-mono text-xs"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="border-border/60 bg-card/40">
              Todos os papéis
            </Button>
            <Button variant="outline" size="sm" className="border-border/60 bg-card/40">
              Status
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/60 text-left font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <th className="px-5 py-3 font-normal">Usuário</th>
                <th className="px-5 py-3 font-normal">Papel</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal">MFA</th>
                <th className="px-5 py-3 font-normal">Última atividade</th>
                <th className="px-5 py-3 font-normal text-right">ID</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-border/40 transition-colors hover:bg-card/60"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded bg-primary/10 font-mono text-xs uppercase text-primary">
                        {u.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm">{u.name}</span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {u.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="font-mono text-xs text-foreground/80">{u.role}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                        statusClasses[u.status],
                      )}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    {u.mfa ? (
                      <span className="flex items-center gap-2 font-mono text-xs text-success">
                        <span className="size-1.5 rounded-full bg-success shadow-[0_0_4px_var(--success)]" />
                        Ativo
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                    {u.lastSeen}
                  </td>
                  <td className="px-5 py-4 text-right font-mono text-[10px] text-muted-foreground">
                    {u.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border/60 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>{users.length} de 24 usuários</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2 font-mono text-[10px]">
              Anterior
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 font-mono text-[10px]">
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
