/**
 * AnnouncementBar — barra superior com mensagens em marquee infinito.
 * Inspirada na referência Jaguar·Glow, adaptada ao tom técnico/cyber.
 */
import { announcements } from "@/lib/site-config"

export function AnnouncementBar() {
  // Duplicamos as mensagens para criar loop contínuo sem cortes
  const items = [...announcements, ...announcements]

  return (
    <div
      role="region"
      aria-label="Anúncios xZark"
      className="relative w-full border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <div className="relative flex h-9 overflow-hidden">
        <div className="flex animate-marquee shrink-0 items-center whitespace-nowrap will-change-transform">
          {items.map((msg, i) => (
            <div
              key={i}
              className="flex items-center gap-6 px-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span>{msg}</span>
              <span aria-hidden className="size-1 rounded-full bg-primary/60" />
            </div>
          ))}
        </div>
      </div>
      {/* fades laterais */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
