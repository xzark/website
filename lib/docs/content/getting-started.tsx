import {
  Callout,
  CardGrid,
  CardLink,
  FeatureGrid,
  Lead,
  Prose,
  Step,
  Steps,
} from "@/components/docs/doc-primitives"
import { CodeBlock } from "@/components/docs/code-block"
import { InstallTabs } from "@/components/docs/install-tabs"
import type { DocContent } from "@/lib/docs/types"

/* ============================================================= */
/* Introdução                                                    */
/* ============================================================= */

export const introducao: DocContent = {
  eyebrow: "Começar",
  title: "Introdução",
  description:
    "Bem-vindo à documentação da xZark — a infraestrutura de cibersegurança e privacidade para empresas modernas. Comece por aqui para entender a plataforma.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <Lead>
            A xZark reúne autenticação, proteção contra ameaças, gerenciamento
            de segredos, cloud soberana e gateway de rede em uma única
            plataforma com design zero-trust.
          </Lead>
          <p>
            Esta documentação cobre desde os primeiros passos até a referência
            técnica completa de cada SDK. Se é a sua primeira vez por aqui,
            recomendamos seguir o fluxo abaixo na ordem.
          </p>
        </Prose>
      ),
    },
    {
      id: "como-navegar",
      title: "Como navegar",
      content: (
        <Prose>
          <p>
            A documentação está organizada em grupos progressivos. Use a barra
            lateral para saltar entre seções e o índice à direita para navegar
            dentro de cada página.
          </p>
          <CardGrid>
            <CardLink
              href="/docs/guia-rapido"
              title="Guia rápido"
              description="Coloque um SDK da xZark em produção em poucos minutos."
            />
            <CardLink
              href="/docs/instalacao"
              title="Instalação"
              description="Instale e autentique os SDKs no seu ambiente."
            />
            <CardLink
              href="/docs/conceitos"
              title="Conceitos principais"
              description="Entenda os modelos que regem toda a plataforma."
            />
            <CardLink
              href="/docs/referencia"
              title="Referência técnica"
              description="Métodos, parâmetros e respostas de cada API."
            />
          </CardGrid>
        </Prose>
      ),
    },
    {
      id: "principios",
      title: "Princípios",
      content: (
        <Prose>
          <p>
            Todos os produtos da xZark compartilham os mesmos princípios de
            engenharia:
          </p>
          <FeatureGrid
            items={[
              "Zero-trust por padrão",
              "Criptografia forte em repouso e em trânsito",
              "SDKs type-safe e idiomáticos",
              "Auditoria e rastreabilidade completas",
              "Baixa latência em escala global",
              "Compatível com LGPD, GDPR e SOC 2",
            ]}
          />
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Guia rápido                                                   */
/* ============================================================= */

export const guiaRapido: DocContent = {
  eyebrow: "Começar",
  title: "Guia rápido",
  description:
    "Do zero ao primeiro segredo protegido em minutos. Um passo a passo enxuto para sentir a plataforma funcionando.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "pre-requisitos",
      title: "Pré-requisitos",
      content: (
        <Prose>
          <FeatureGrid
            columns={1}
            items={[
              "Node.js 18 ou superior",
              "Uma conta xZark com uma API Key ativa",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "passos",
      title: "Passo a passo",
      content: (
        <Prose>
          <Steps>
            <Step title="1. Instale o SDK">
              <InstallTabs command="@xvault/node" defaultRuntime="nodejs" />
            </Step>
            <Step title="2. Configure a API Key">
              <CodeBlock
                language="bash"
                filename=".env"
                code={`XVAULT_API_KEY=your_api_key_here`}
              />
            </Step>
            <Step title="3. Inicialize o client">
              <CodeBlock
                language="ts"
                filename="lib/xvault.ts"
                code={`import { XVault } from "@xvault/node"

export const vault = new XVault({
  apiKey: process.env.XVAULT_API_KEY!,
})`}
              />
            </Step>
            <Step title="4. Crie seu primeiro segredo">
              <CodeBlock
                language="ts"
                filename="quickstart.ts"
                code={`const secret = await vault.secrets.set({
  key: "DATABASE_URL",
  value: "postgres://localhost:5432/myapp",
})

console.log(secret) // { key: "DATABASE_URL", version: 1 }`}
              />
            </Step>
          </Steps>
          <Callout variant="success" title="Pronto!">
            Seu segredo foi criptografado e versionado automaticamente. Veja{" "}
            <a className="text-primary underline-offset-4 hover:underline" href="/docs/xvault/segredos">
              Gerenciar segredos
            </a>{" "}
            para as operações completas de CRUD.
          </Callout>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Instalação                                                    */
/* ============================================================= */

export const instalacao: DocContent = {
  eyebrow: "Começar",
  title: "Instalação",
  description:
    "Instale os SDKs da xZark no seu runtime preferido e valide a configuração.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "instalar",
      title: "Instalar o SDK",
      content: (
        <Prose>
          <p>
            Os SDKs da xZark funcionam em servidores, ambientes serverless e
            edge runtimes. Escolha o gerenciador de pacotes do seu projeto:
          </p>
          <InstallTabs command="@xvault/node" defaultRuntime="nodejs" />
          <Callout variant="info">
            Requer Node.js 18 ou superior. As mesmas instruções valem para os
            demais SDKs, trocando apenas o nome do pacote.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "verificar",
      title: "Verificar a instalação",
      content: (
        <Prose>
          <p>Confirme que o pacote foi instalado corretamente:</p>
          <CodeBlock
            language="ts"
            filename="check.ts"
            code={`import { XVault } from "@xvault/node"

console.log(typeof XVault === "function" ? "ok" : "falhou")`}
          />
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Configuração                                                  */
/* ============================================================= */

export const configuracao: DocContent = {
  eyebrow: "Começar",
  title: "Configuração",
  description:
    "Configure credenciais, ambientes e opções avançadas dos SDKs da xZark.",
  updatedAt: "2026-06-10",
  sections: [
    {
      id: "credenciais",
      title: "Credenciais",
      content: (
        <Prose>
          <p>
            Defina sua API Key como variável de ambiente. Nunca a exponha no
            frontend ou em repositórios públicos.
          </p>
          <CodeBlock
            language="bash"
            filename=".env"
            code={`XVAULT_API_KEY=your_api_key_here`}
          />
          <Callout variant="danger" title="Segurança">
            Trate a API Key como um segredo de produção. Use rotação periódica
            e escopos mínimos sempre que possível.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "opcoes",
      title: "Opções do client",
      content: (
        <Prose>
          <p>O client aceita opções adicionais na inicialização:</p>
          <CodeBlock
            language="ts"
            filename="lib/xvault.ts"
            code={`export const vault = new XVault({
  apiKey: process.env.XVAULT_API_KEY!,
  environment: "production",
  timeout: 10_000,
  retries: 3,
})`}
          />
        </Prose>
      ),
    },
  ],
}
