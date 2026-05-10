/**
 * Logo xZark — marca textual minimalista com mark gráfico.
 * Inspirado em Vercel/Linear: símbolo geométrico + wordmark.
 */
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="xZark — página inicial"
      className={cn(
        "group inline-flex items-center gap-2.5 text-foreground transition-opacity hover:opacity-90",
        className,
      )}
    >
      <LogoMark className="size-5" />
      {showText && (
        <span className="font-sans text-[15px] font-medium tracking-tight">
          x<span className="font-serif italic">Zark</span>
        </span>
      )}
    </Link>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-primary", className)}
      aria-hidden="true"
    >
      <path
        d="M3 3h7l-7 8h7l-7 8M14 3h7l-7 8h7l-7 8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  )
}
