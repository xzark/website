import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = { title: "Termos de Uso", description: "Termos de uso do site público xZark." }
const sections: LegalSection[] = [
  { id: "scope", title: "Escopo", content: <p>Estes termos se aplicam ao uso do site público xzark.co, seus conteúdos, formulários e materiais de documentação.</p> },
  { id: "use", title: "Uso permitido", content: <p>Você pode consultar, compartilhar e utilizar os materiais para avaliação informativa. Não tente interferir no funcionamento do site, acessar áreas não públicas ou enviar conteúdo ilícito.</p> },
  { id: "content", title: "Conteúdo e status", content: <p>Descrições de produtos, serviços e arquitetura podem representar conceitos em desenvolvimento. O conteúdo não constitui promessa de disponibilidade, certificação, desempenho ou contrato comercial.</p> },
  { id: "contact", title: "Contato", content: <p>Dúvidas sobre estes termos podem ser enviadas pela página de contato do site.</p> },
]
export default function TermsPage() { return <LegalPage eyebrow="Documento legal" title={<>Termos de <span className="font-serif italic text-primary">Uso</span>.</>} description="Condições para uso do site público xZark." lastUpdated="07/09/2026" sections={sections} /> }
