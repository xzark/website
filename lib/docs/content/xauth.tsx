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
