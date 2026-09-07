import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = { title: "Política de Cookies", description: "Uso de cookies no site público xZark." }
const sections: LegalSection[] = [
  { id: "what", title: "O que são cookies", content: <p>Cookies são pequenos arquivos armazenados pelo navegador para lembrar preferências e apoiar o funcionamento de um site.</p> },
  { id: "use", title: "Uso no site", content: <p>O site público pode utilizar recursos estritamente necessários ao funcionamento da navegação. Não descrevemos aqui cookies de autenticação, pois não existe área de login ou conta.</p> },
  { id: "control", title: "Controle", content: <p>Você pode bloquear ou remover cookies nas configurações do navegador. Algumas preferências de navegação podem deixar de funcionar.</p> },
  { id: "contact", title: "Dúvidas", content: <p>Para questões sobre esta política, utilize a página de contato.</p> },
]
export default function CookiesPage() { return <LegalPage eyebrow="Documento legal" title={<>Política de <span className="font-serif italic text-primary">Cookies</span>.</>} description="Uso de cookies no site público xZark." lastUpdated="07/09/2026" sections={sections} /> }
