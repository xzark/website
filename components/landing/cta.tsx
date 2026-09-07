/**
 * CTA — chamada final premium com glow e composição editorial.
 */
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { GridBackground } from "@/components/site/grid-background"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background">
      <GridBackground variant="small" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            Pronto para o próximo nível?
          </p>
          <h2 className="mt-6 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            Segurança não é{" "}
            <span className="font-serif italic text-primary text-glow">
              opcional
            </span>
            .
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            Converse com nosso time de engenharia sobre seu contexto, requisitos e próximos passos técnicos.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-md bg-foreground px-5 text-sm font-medium text-background hover:bg-foreground/90"
            >
              <Link href="/contact">
                Solicitar acesso
                <ArrowUpRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="h-11 rounded-md border border-border/80 bg-transparent px-5 text-sm font-medium text-foreground hover:bg-accent/40"
            >
              <Link href="/security">Ver postura de segurança</Link>
            </Button>
          </div>
          <p className="mt-8 font-mono text-[11px] text-muted-foreground">
            Atendimento técnico em português, inglês e espanhol
          </p>
        </div>
      </div>
    </section>
  )
}
