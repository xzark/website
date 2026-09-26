import {
  Callout,
  FeatureGrid,
  Lead,
  Prose,
} from "@/components/docs/doc-primitives"
import { InstallTabs } from "@/components/docs/install-tabs"
import { CodeBlock } from "@/components/docs/code-block"
import type { DocContent } from "@/lib/docs/types"

/* ============================================================= */
/* xAuth — Visão geral                                           */
/* ============================================================= */

export const xauthOverview: DocContent = {
  eyebrow: "xAuth",
  title: "xAuth",
  description:
    "Plataforma enterprise de autenticação e gerenciamento de identidade com design zero-trust.",
  updatedAt: "2026-06-05",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <Lead>
            O xAuth oferece infraestrutura completa de autenticação moderna para
            aplicações Node.js — com passkeys, MFA adaptativo, SSO e sessões
            seguras.
          </Lead>
          <FeatureGrid
            items={[
              "Passkeys e WebAuthn nativos",
              "MFA adaptativo com análise de risco",
              "SSO empresarial (OIDC/SAML)",
              "Sessões seguras com rotação automática",
              "Audit logs avançados",
              "SDKs modernos e type-safe",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "instalacao",
      title: "Instalação",
      content: (
        <Prose>
          <p>Instale o SDK oficial do xAuth no seu projeto Node.js.</p>
          <InstallTabs command="@xauth/node" defaultRuntime="nodejs" />
        </Prose>
      ),
    },
    {
      id: "inicializacao",
      title: "Inicialização",
      content: (
        <Prose>
          <p>Configure o client com sua API Key.</p>
          <CodeBlock
            language="ts"
            filename="lib/xauth.ts"
            code={`import { XAuth } from "@xauth/node"

export const auth = new XAuth({
  apiKey: process.env.XAUTH_API_KEY!,
})`}
          />
          <Callout variant="info">
            A referência completa de middleware, sessões e RBAC será expandida
            nesta seção. A estrutura já está preparada para crescer.
          </Callout>
        </Prose>
      ),
    },
  ],
}

export const xshieldOverview: DocContent = {
  eyebrow: "xShield",
  title: "xShield",
  description: "Conceitos de proteção de aplicações, análise de ameaças e políticas de segurança em desenvolvimento.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <Lead>
            O xShield explora uma camada de segurança para aplicações modernas,
            conectando políticas, sinais de ameaça e decisões de proteção.
          </Lead>
          <FeatureGrid items={["Políticas de aplicação", "Análise de ameaças", "Superfícies digitais", "Monitoramento orientado a risco"]} />
          <Callout variant="info">
            O xShield está em desenvolvimento. Esta página descreve direção
            técnica e não representa disponibilidade operacional.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "escopo",
      title: "Escopo explorado",
      content: (
        <Prose>
          <p>
            A pesquisa do produto considera controles de acesso, proteção de
            rotas, análise de comportamento e integração com fluxos de resposta.
          </p>
          <Callout variant="tip" title="Próximos passos">
            A referência técnica será publicada conforme as interfaces do
            produto forem definidas e validadas.
          </Callout>
        </Prose>
      ),
    },
  ],
}
