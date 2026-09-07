import { Callout, Lead, Prose } from "@/components/docs/doc-primitives"
import type { DocContent } from "@/lib/docs/types"

/* ============================================================= */
/* FAQ                                                           */
/* ============================================================= */

const faqItems: { q: string; a: React.ReactNode }[] = [
  {
    q: "Quais runtimes são suportados?",
    a: "Os SDKs funcionam em Node.js 18+, ambientes serverless e edge runtimes como Next.js, Express, Fastify e Hono.",
  },
  {
    q: "Como minhas credenciais são protegidas?",
    a: "O produto é apresentado como um conceito de cofre para segredos, com escopos e rotação como requisitos de segurança a serem implementados e verificados.",
  },
  {
    q: "Posso usar ambientes separados?",
    a: "Sim. Cada segredo pode existir de forma isolada em development, staging e production, sem vazamento entre ambientes.",
  },
  {
    q: "O que acontece quando atualizo um segredo?",
    a: "Uma nova versão imutável é criada automaticamente. Você pode fazer rollback para versões anteriores quando necessário.",
  },
  {
    q: "A plataforma é compatível com requisitos de conformidade?",
    a: "Os produtos são conceitos em desenvolvimento. Requisitos de conformidade e controles específicos devem ser avaliados em uma etapa técnica futura.",
  },
]

export const faq: DocContent = {
  eyebrow: "Recursos",
  title: "Perguntas frequentes",
  description:
    "Respostas rápidas para as dúvidas mais comuns sobre os SDKs e a plataforma xZark.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "perguntas",
      title: "Perguntas frequentes",
      content: (
        <Prose>
          <Lead>
            Não encontrou o que procurava? Fale com nosso time pela página de
            contato.
          </Lead>
          <div className="divide-y divide-border/50 overflow-hidden rounded-2xl border border-border/60">
            {faqItems.map((item) => (
              <div key={item.q} className="p-5">
                <h3 className="text-sm font-medium text-foreground">
                  {item.q}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/75">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Changelog                                                     */
/* ============================================================= */

const releases: {
  version: string
  date: string
  tag: "Novo" | "Melhoria" | "Correção"
  changes: string[]
}[] = [
  {
    version: "2.4.0",
    date: "10 jun 2026",
    tag: "Novo",
    changes: [
      "Nova arquitetura de documentação com sidebar e índice de página.",
      "Primitivas de conteúdo reutilizáveis (callouts, passos, tabelas).",
      "Suporte aprimorado a exemplos de código com nome de arquivo e linguagem.",
    ],
  },
  {
    version: "2.3.1",
    date: "28 mai 2026",
    tag: "Correção",
    changes: [
      "Correção na paginação entre páginas adjacentes.",
      "Ajustes de contraste em callouts no tema escuro.",
    ],
  },
  {
    version: "2.3.0",
    date: "15 mai 2026",
    tag: "Melhoria",
    changes: [
      "Rotação manual de segredos via flag force.",
      "Exportação de audit logs em lote.",
    ],
  },
]

const tagStyles: Record<string, string> = {
  Novo: "border-primary/30 bg-primary/10 text-primary",
  Melhoria: "border-success/30 bg-success/10 text-success",
  Correção: "border-border bg-muted text-muted-foreground",
}

export const changelog: DocContent = {
  eyebrow: "Recursos",
  title: "Changelog",
  description:
    "Histórico de mudanças, melhorias e correções dos SDKs e da plataforma xZark.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "releases",
      title: "Últimas versões",
      content: (
        <Prose>
          <div className="space-y-4">
            {releases.map((release) => (
              <div
                key={release.version}
                className="rounded-2xl border border-border/60 bg-card p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-medium text-foreground">
                    v{release.version}
                  </span>
                  <span
                    className={
                      "rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em] " +
                      tagStyles[release.tag]
                    }
                  >
                    {release.tag}
                  </span>
                  <span className="ml-auto font-mono text-[10.5px] uppercase tracking-[0.2em] text-muted-foreground">
                    {release.date}
                  </span>
                </div>
                <ul className="mt-4 space-y-2">
                  {release.changes.map((change) => (
                    <li
                      key={change}
                      className="flex gap-2.5 text-sm text-foreground/80"
                    >
                      <span
                        aria-hidden
                        className="mt-2 size-1 shrink-0 rounded-full bg-primary"
                      />
                      {change}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <Callout variant="info">
            Versões anteriores permanecem disponíveis no repositório oficial.
          </Callout>
        </Prose>
      ),
    },
  ],
}
