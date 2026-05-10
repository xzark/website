import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da xZark — LGPD, GDPR e CCPA compliant.",
}

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Escopo e Aplicabilidade",
    content: (
      <>
        <p>
          Esta Política de Privacidade descreve como a xZark Tecnologia Ltda. (&quot;xZark&quot;) coleta, usa,
          armazena e compartilha dados pessoais. Aplica-se ao site xzark.co, à Plataforma xZark e a
          qualquer interação com nossos canais oficiais.
        </p>
        <p>
          Estamos em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018), com o
          Regulamento Geral de Proteção de Dados (GDPR) e com a California Consumer Privacy Act (CCPA).
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "Dados Coletados",
    content: (
      <>
        <p>Coletamos apenas o estritamente necessário:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Dados de conta:</strong> nome, email corporativo, empresa, cargo.
          </li>
          <li>
            <strong>Dados técnicos:</strong> endereço IP, user agent, telemetria de uso da Plataforma.
          </li>
          <li>
            <strong>Dados de comunicação:</strong> mensagens enviadas via formulários ou suporte.
          </li>
          <li>
            <strong>Dados de pagamento:</strong> processados por gateways certificados PCI-DSS, sem armazenamento direto.
          </li>
        </ul>
        <p>
          <strong>Não coletamos:</strong> conteúdo de cofres, segredos ou chaves criptográficas. Tudo é
          criptografado ponta a ponta com chaves sob seu controle (BYOK).
        </p>
      </>
    ),
  },
  {
    id: "purpose",
    title: "Finalidades do Tratamento",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Provisão dos serviços contratados (base legal: execução de contrato).</li>
        <li>Cumprimento de obrigações legais e regulatórias (base: obrigação legal).</li>
        <li>Segurança da Plataforma e prevenção a fraudes (base: legítimo interesse).</li>
        <li>Comunicações operacionais (base: execução de contrato).</li>
        <li>Marketing direcionado a clientes existentes (base: legítimo interesse, opt-out disponível).</li>
      </ul>
    ),
  },
  {
    id: "rights",
    title: "Direitos do Titular",
    content: (
      <>
        <p>Conforme LGPD, GDPR e CCPA, você tem direito a:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Confirmação da existência de tratamento.</li>
          <li>Acesso aos dados.</li>
          <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
          <li>Anonimização, bloqueio ou eliminação.</li>
          <li>Portabilidade.</li>
          <li>Revogação de consentimento.</li>
          <li>Oposição a tratamento baseado em legítimo interesse.</li>
        </ul>
        <p>
          Para exercer qualquer direito, envie solicitação para{" "}
          <strong>privacy@xzark.co</strong>. Respondemos em até 15 dias.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "Compartilhamento de Dados",
    content: (
      <>
        <p>
          A xZark <strong>não vende</strong> dados pessoais sob nenhuma circunstância. Compartilhamos
          dados apenas com:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Subprocessadores essenciais (cloud providers, gateways de pagamento), todos com contratos
            DPA equivalentes ao GDPR Art. 28.
          </li>
          <li>Autoridades públicas, mediante ordem judicial fundamentada e específica.</li>
          <li>Auditores externos, sob NDA, exclusivamente para certificações regulatórias.</li>
        </ul>
        <p>
          Lista completa de subprocessadores disponível em xzark.co/subprocessors, atualizada com 30
          dias de antecedência a qualquer mudança.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retenção de Dados",
    content: (
      <>
        <p>
          Mantemos dados pessoais apenas pelo tempo necessário às finalidades descritas, ou conforme
          exigido por lei. Após o término da relação contratual:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Dados operacionais: excluídos em até 30 dias.</li>
          <li>Logs de auditoria: retidos por 7 anos (compliance fiscal/regulatório).</li>
          <li>Dados criptografados sob suas chaves: descartados criptograficamente em 24h.</li>
        </ul>
      </>
    ),
  },
  {
    id: "security",
    title: "Segurança da Informação",
    content: (
      <p>
        Aplicamos controles técnicos e organizacionais state-of-the-art: criptografia AES-256 em
        repouso, TLS 1.3 em trânsito, HSM FIPS 140-3 Level 3, SOC 2 Type II, ISO 27001/27701, acesso
        break-glass auditado e treinamento contínuo de equipe. Notificamos incidentes em até 72h
        conforme LGPD/GDPR.
      </p>
    ),
  },
  {
    id: "international",
    title: "Transferências Internacionais",
    content: (
      <p>
        Você escolhe a região de armazenamento na criação da conta. Não realizamos transferências
        internacionais sem autorização explícita. Quando ocorrem, são protegidas por Cláusulas
        Contratuais Padrão (SCCs) da Comissão Europeia e mecanismos equivalentes da ANPD.
      </p>
    ),
  },
  {
    id: "dpo",
    title: "Encarregado (DPO)",
    content: (
      <p>
        Encarregado de Proteção de Dados: <strong>Carolina Mendes</strong>
        <br />
        Email: dpo@xzark.co
        <br />
        Endereço: Av. Brigadeiro Faria Lima, 4440, 14º andar, Salvador/BA, 04538-132.
      </p>
    ),
  },
]

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title={
        <>
          Política de <span className="font-serif italic text-primary">Privacidade</span>.
        </>
      }
      description="Como tratamos seus dados pessoais — em conformidade com LGPD, GDPR e CCPA."
      lastUpdated="01/03/2026"
      sections={sections}
    />
  )
}
