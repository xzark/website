import type { Metadata } from "next"
import { LegalPage, type LegalSection } from "@/components/legal/legal-page"

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso da plataforma xZark.",
}

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Aceitação dos Termos",
    content: (
      <>
        <p>
          Estes Termos de Uso (&quot;Termos&quot;) regem o acesso e uso dos serviços oferecidos pela xZark
          Tecnologia Ltda. (&quot;xZark&quot;), CNPJ XX.XXX.XXX/0001-XX, com sede em Salvador/BA, Brasil.
        </p>
        <p>
          Ao acessar ou utilizar qualquer produto, API, SDK ou serviço da xZark (coletivamente, a
          &quot;Plataforma&quot;), você concorda com estes Termos. Se não concordar, não use a Plataforma.
        </p>
      </>
    ),
  },
  {
    id: "definitions",
    title: "Definições",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <strong>Cliente:</strong> pessoa jurídica que contrata a Plataforma mediante contrato comercial.
        </li>
        <li>
          <strong>Usuário:</strong> indivíduo autorizado pelo Cliente a acessar a Plataforma.
        </li>
        <li>
          <strong>Conteúdo do Cliente:</strong> dados, segredos, configurações e informações fornecidas pelo Cliente.
        </li>
        <li>
          <strong>Documentação:</strong> manuais técnicos, guias e referências publicados em xzark.co/docs.
        </li>
      </ul>
    ),
  },
  {
    id: "license",
    title: "Licença de Uso",
    content: (
      <>
        <p>
          A xZark concede ao Cliente uma licença não exclusiva, intransferível e revogável para acessar e
          usar a Plataforma exclusivamente para os fins comerciais legítimos do Cliente, conforme contrato.
        </p>
        <p>
          É expressamente vedado: (i) realizar engenharia reversa de qualquer componente da Plataforma;
          (ii) revender o acesso a terceiros sem autorização escrita; (iii) usar a Plataforma para
          atividades ilícitas; (iv) tentar contornar mecanismos de segurança, rate limits ou auditoria.
        </p>
      </>
    ),
  },
  {
    id: "obligations",
    title: "Obrigações do Cliente",
    content: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Manter credenciais de acesso confidenciais e seguras.</li>
        <li>Notificar imediatamente qualquer comprometimento de credencial via security@xzark.co.</li>
        <li>Cumprir leis aplicáveis, incluindo LGPD, GDPR e legislação setorial pertinente.</li>
        <li>Não inserir dados sensíveis em ambientes de teste ou demo.</li>
        <li>Manter contato técnico e jurídico atualizados na conta corporativa.</li>
      </ul>
    ),
  },
  {
    id: "sla",
    title: "Disponibilidade e SLA",
    content: (
      <>
        <p>
          A xZark se compromete a manter disponibilidade mínima de 99,99% para produtos em estado GA
          (General Availability), conforme medido por nossos sistemas de monitoramento independentes.
        </p>
        <p>
          Em caso de descumprimento do SLA, o Cliente faz jus a créditos de serviço escalonados, conforme
          tabela específica do contrato comercial. Manutenções programadas com aviso prévio de 72h não
          contam como downtime.
        </p>
      </>
    ),
  },
  {
    id: "ip",
    title: "Propriedade Intelectual",
    content: (
      <p>
        Todos os direitos de propriedade intelectual sobre a Plataforma, incluindo código-fonte, marcas,
        algoritmos e documentação, permanecem exclusivamente com a xZark. O Cliente mantém todos os
        direitos sobre o Conteúdo do Cliente.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Suspensão e Rescisão",
    content: (
      <p>
        A xZark pode suspender ou encerrar o acesso em caso de violação destes Termos, inadimplência
        contratual, atividade fraudulenta ou risco material à Plataforma. O Cliente pode rescindir o
        contrato conforme cláusula específica do contrato comercial, com retenção de dados conforme
        Política de Privacidade.
      </p>
    ),
  },
  {
    id: "liability",
    title: "Limitação de Responsabilidade",
    content: (
      <p>
        Salvo dolo, fraude ou culpa grave comprovados, a responsabilidade total da xZark perante o
        Cliente, em qualquer hipótese, fica limitada ao valor efetivamente pago pelo Cliente nos 12 meses
        anteriores ao evento gerador. A xZark não se responsabiliza por danos indiretos, lucros cessantes
        ou perda de oportunidade comercial.
      </p>
    ),
  },
  {
    id: "law",
    title: "Lei Aplicável e Foro",
    content: (
      <p>
        Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da
        Comarca de Salvador/BA para dirimir quaisquer controvérsias, com renúncia expressa a qualquer
        outro, por mais privilegiado que seja.
      </p>
    ),
  },
]

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Documento legal"
      title={
        <>
          Termos de <span className="font-serif italic text-primary">Uso</span>.
        </>
      }
      description="Este documento estabelece as condições de uso da plataforma xZark por clientes e usuários autorizados."
      lastUpdated="01/03/2026"
      sections={sections}
    />
  )
}
