import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Política de Cookies da xZark.",
}

const sections: LegalSection[] = [
  {
    id: "what",
    title: "O que são cookies",
    content: (
      <p>
        Cookies são pequenos arquivos de texto armazenados pelo navegador no seu dispositivo. Permitem
        que sites reconheçam o usuário, lembrem preferências e mensurem performance. Tecnologias
        equivalentes (localStorage, pixels) seguem a mesma política descrita aqui.
      </p>
    ),
  },
  {
    id: "categories",
    title: "Categorias de cookies utilizadas",
    content: (
      <div className="space-y-4">
        <div className="rounded-lg border border-border/60 bg-card/50 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            Estritamente necessários
          </p>
          <p className="mt-2">
            Indispensáveis ao funcionamento da Plataforma: autenticação, sessão, balanceamento, CSRF.
            Não podem ser desativados, pois sem eles os serviços não operam.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            Funcionais
          </p>
          <p className="mt-2">
            Lembram preferências (idioma, tema, região). Melhoram a experiência mas o site funciona sem
            eles. Opt-in obrigatório.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            Analíticos
          </p>
          <p className="mt-2">
            Estatísticas agregadas e anonimizadas de uso (Vercel Analytics, primeiro-parte). Sem
            identificadores pessoais. Opt-in obrigatório.
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-primary">
            Marketing
          </p>
          <p className="mt-2">
            <strong>Não utilizamos.</strong> A xZark não opera cookies de terceiros para publicidade
            comportamental, retargeting ou perfilamento.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "control",
    title: "Como controlar cookies",
    content: (
      <>
        <p>Você pode gerenciar cookies de três formas:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Pelo banner de consentimento exibido na primeira visita (preferências granulares por categoria).
          </li>
          <li>Nas configurações da sua conta (clientes autenticados).</li>
          <li>Diretamente no navegador (todas as plataformas modernas oferecem controles).</li>
        </ul>
        <p>
          A revogação não afeta cookies estritamente necessários. Sem eles, a Plataforma não opera.
        </p>
      </>
    ),
  },
  {
    id: "duration",
    title: "Duração",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Cookies de sessão: expiram ao fechar o navegador.</li>
        <li>Cookies persistentes: máximo 12 meses.</li>
        <li>Cookies de autenticação: TTL curto (15min) com refresh seguro.</li>
      </ul>
    ),
  },
  {
    id: "contact",
    title: "Dúvidas",
    content: (
      <p>
        Para questões sobre esta política, escreva para <strong>privacy@xzark.co</strong>. Respondemos
        em até 15 dias.
      </p>
    ),
  },
]

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title={
        <>
          Política de <span className="font-serif italic text-primary">Cookies</span>.
        </>
      }
      description="Como usamos cookies e tecnologias equivalentes — sem rastreamento de terceiros."
      lastUpdated="01/03/2026"
      sections={sections}
    />
  )
}
