/**
 * Loading do dashboard admin — skeleton fiel à estrutura da página.
 * Evita layout shift quando dados são carregados de Server Components.
 */
import { Skeleton } from "@/components/ui/skeleton"

export default function AdminLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border border-border/60 bg-card/40 p-5"
          >
            <Skeleton className="mb-3 h-3 w-20" />
            <Skeleton className="mb-3 h-7 w-24" />
            <Skeleton className="h-2.5 w-16" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-lg border border-border/60 bg-card/40 p-5 lg:col-span-2">
          <Skeleton className="mb-4 h-4 w-40" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="rounded-lg border border-border/60 bg-card/40 p-5">
          <Skeleton className="mb-4 h-4 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
