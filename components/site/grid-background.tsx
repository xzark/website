/**
 * GridBackground — grid futurista com fade radial.
 * Usado em heros e seções de destaque para reforçar estética técnica.
 */
import { cn } from "@/lib/utils"

interface GridBackgroundProps {
  className?: string
  variant?: "default" | "small"
  withGlow?: boolean
}

export function GridBackground({
  className,
  variant = "default",
  withGlow = true,
}: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0 mask-radial",
          variant === "small" ? "bg-grid-sm" : "bg-grid",
        )}
      />
      {/* Glow azul superior */}
      {withGlow && (
        <>
          <div
            className="absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.72 0.18 245 / 0.5), transparent)",
            }}
          />
          <div
            className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to right, transparent, oklch(0.72 0.18 245 / 0.6), transparent)",
            }}
          />
        </>
      )}
    </div>
  )
}
