/**
 * SectionHeader — cabeçalho padrão de seções com etiqueta mono + título serif.
 * Reforça hierarquia visual em todas as páginas.
 */
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "left" | "center"
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2">
          <span aria-hidden className="size-1 rounded-full bg-primary" />
          <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="text-balance text-3xl font-medium leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
