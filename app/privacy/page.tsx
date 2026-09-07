import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = { title: "Política de Privacidade", description: "Como o site público xZark trata mensagens e dados enviados por contato." }
const sections: LegalSection[] = [
  { id: "scope", title: "Escopo", content: <p>Esta política descreve o tratamento de dados fornecidos voluntariamente por visitantes ao utilizar os canais públicos de contato da xZark.</p> },
  { id: "data", title: "Dados enviados", content: <p>Um formulário de contato pode solicitar nome, e-mail e o conteúdo da mensagem. Envie apenas os dados necessários para sua solicitação e não inclua segredos, credenciais ou informações sensíveis.</p> },
  { id: "purpose", title: "Finalidade", content: <p>Os dados são utilizados para responder à mensagem, avaliar uma solicitação e manter a comunicação relacionada ao contato. Não apresentamos neste site sistemas de conta ou áreas autenticadas.</p> },
  { id: "rights", title: "Solicitações", content: <p>Para dúvidas ou solicitações relacionadas a uma mensagem enviada, utilize a página de contato informando o endereço usado na comunicação.</p> },
  { id: "security", title: "Segurança", content: <p>Aplicamos medidas razoáveis para proteger as comunicações recebidas. Nenhum canal público deve ser usado para enviar chaves, senhas ou material confidencial.</p> },
]
export default function PrivacyPage() { return <LegalPage eyebrow="Documento legal" title={<>Política de <span className="font-serif italic text-primary">Privacidade</span>.</>} description="Como o site público xZark trata mensagens e dados enviados por contato." lastUpdated="07/09/2026" sections={sections} /> }
