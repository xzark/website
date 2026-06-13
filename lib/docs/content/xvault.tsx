import {
  Callout,
  DefinitionList,
  FeatureGrid,
  Lead,
  Prose,
  PropTable,
} from "@/components/docs/doc-primitives"
import { CodeBlock } from "@/components/docs/code-block"
import { InstallTabs } from "@/components/docs/install-tabs"
import type { DocContent } from "@/lib/docs/types"

/* ============================================================= */
/* xVault — Visão geral / Getting started                        */
/* ============================================================= */

export const xvaultOverview: DocContent = {
  eyebrow: "xVault",
  title: "xVault",
  description:
    "Gerenciamento seguro de segredos e variáveis de ambiente para equipes e organizações.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "o-que-e",
      title: "O que é o xVault?",
      content: (
        <Prose>
          <Lead>
            O xVault é um sistema seguro de gerenciamento de segredos
            desenvolvido para aplicações modernas. Ele permite armazenar,
            versionar e proteger informações sensíveis como API Keys, tokens,
            credenciais de banco de dados e variáveis críticas.
          </Lead>
          <p>
            Diferente de variáveis de ambiente tradicionais, o xVault oferece
            criptografia forte, controle de acesso e histórico completo de
            alterações.
          </p>
          <FeatureGrid
            items={[
              "Criptografia AES-256",
              "Versionamento automático",
              "Controle de acesso por API Key",
              "Audit logs completos",
              "SDK para Node.js",
              "Integração com CI/CD",
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
          <p>Instale o SDK oficial do xVault no seu projeto Node.js.</p>
          <InstallTabs command="@xvault/node" defaultRuntime="nodejs" />
          <Callout variant="info">
            Requer Node.js 18 ou superior. Funciona em servidores, serverless e
            edge runtimes.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "inicializacao",
      title: "Inicialização",
      content: (
        <Prose>
          <p>Configure o client do xVault utilizando sua API Key.</p>
          <CodeBlock
            language="bash"
            filename=".env"
            code={`XVAULT_API_KEY=your_api_key_here`}
          />
          <CodeBlock
            language="ts"
            filename="lib/xvault.ts"
            code={`import { XVault } from "@xvault/node"

export const vault = new XVault({
  apiKey: process.env.XVAULT_API_KEY!,
})`}
          />
          <Callout variant="warning">
            Nunca exponha sua API Key no frontend ou em repositórios públicos.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "primeiro-segredo",
      title: "Seu primeiro segredo",
      content: (
        <Prose>
          <p>Agora vamos armazenar seu primeiro segredo no vault.</p>
          <CodeBlock
            language="ts"
            filename="create-secret.ts"
            code={`const secret = await vault.secrets.set({
  key: "DATABASE_URL",
  value: "postgres://localhost:5432/myapp",
})

console.log(secret)`}
          />
          <Callout variant="success">
            O segredo é automaticamente criptografado e versionado.
          </Callout>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* xVault — Gerenciar segredos                                   */
/* ============================================================= */

export const xvaultSecrets: DocContent = {
  eyebrow: "xVault",
  title: "Gerenciar segredos",
  description:
    "Operações completas de CRUD sobre segredos, com versionamento e auditoria automáticos.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <p>
            O xVault permite gerenciar segredos de forma segura com operações
            completas de CRUD (Create, Read, Update e Delete).
          </p>
          <FeatureGrid
            items={[
              "Criação segura de segredos",
              "Versionamento automático",
              "Consulta por chave",
              "Listagem por ambiente",
              "Remoção controlada",
              "Auditoria completa",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "parametros",
      title: "Parâmetros de set()",
      content: (
        <Prose>
          <PropTable
            rows={[
              {
                name: "key",
                type: "string",
                required: true,
                description: "Identificador único do segredo.",
              },
              {
                name: "value",
                type: "string",
                required: true,
                description: "Valor a ser criptografado e armazenado.",
              },
              {
                name: "environment",
                type: "string",
                description: "Ambiente alvo. Padrão: o do client.",
              },
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "criar",
      title: "Criando segredos",
      content: (
        <Prose>
          <p>
            Para criar um segredo, utilize <code>vault.secrets.set()</code>.
          </p>
          <CodeBlock
            language="ts"
            filename="create-secret.ts"
            code={`await vault.secrets.set({
  key: "DATABASE_URL",
  value: "postgres://localhost:5432/app",
})`}
          />
          <Callout variant="info">
            Cada segredo é automaticamente criptografado e versionado.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "atualizar",
      title: "Atualizando segredos",
      content: (
        <Prose>
          <p>Atualizar um segredo cria automaticamente uma nova versão.</p>
          <CodeBlock
            language="ts"
            filename="update-secret.ts"
            code={`await vault.secrets.set({
  key: "DATABASE_URL",
  value: "postgres://localhost:5432/new-db",
})`}
          />
          <CodeBlock
            language="json"
            filename="response.json"
            code={`{
  "key": "DATABASE_URL",
  "version": 2
}`}
          />
        </Prose>
      ),
    },
    {
      id: "listar",
      title: "Listando segredos",
      content: (
        <Prose>
          <p>Você pode listar todos os segredos de um ambiente.</p>
          <CodeBlock
            language="ts"
            filename="list-secrets.ts"
            code={`const secrets = await vault.secrets.list({
  environment: "production",
})

console.log(secrets)`}
          />
          <CodeBlock
            language="json"
            filename="response.json"
            code={`[
  { "key": "DATABASE_URL", "version": 3 },
  { "key": "JWT_SECRET", "version": 1 }
]`}
          />
        </Prose>
      ),
    },
    {
      id: "remover",
      title: "Removendo segredos",
      content: (
        <Prose>
          <p>Remova um segredo permanentemente do vault.</p>
          <CodeBlock
            language="ts"
            filename="delete-secret.ts"
            code={`await vault.secrets.delete({
  key: "OLD_SECRET",
})`}
          />
          <Callout variant="danger">
            Essa ação é irreversível e remove todas as versões do segredo.
          </Callout>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* xVault — Variáveis de ambiente                                */
/* ============================================================= */

export const xvaultEnv: DocContent = {
  eyebrow: "xVault",
  title: "Variáveis de ambiente",
  description:
    "Centralize e proteja as variáveis de ambiente da sua aplicação com criptografia e controle de acesso.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "por-que",
      title: "Por que usar o xVault?",
      content: (
        <Prose>
          <p>
            Variáveis de ambiente tradicionais são inseguras em escala. O xVault
            centraliza e protege esses valores com criptografia e controle de
            acesso.
          </p>
          <FeatureGrid
            items={[
              "Sem exposição em .env",
              "Controle por ambiente",
              "Versionamento automático",
              "Audit logs",
              "Revogação instantânea",
              "Segurança em runtime",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "configuracao",
      title: "Configuração inicial",
      content: (
        <Prose>
          <p>Defina sua API Key no ambiente seguro:</p>
          <CodeBlock
            language="bash"
            filename=".env"
            code={`XVAULT_API_KEY=your_key_here`}
          />
        </Prose>
      ),
    },
    {
      id: "uso",
      title: "Usando como env manager",
      content: (
        <Prose>
          <p>Carregue variáveis diretamente do vault:</p>
          <CodeBlock
            language="ts"
            code={`const dbUrl = await vault.env.get("DATABASE_URL")

console.log(dbUrl)`}
          />
        </Prose>
      ),
    },
    {
      id: "sincronizacao",
      title: "Sincronização automática",
      content: (
        <Prose>
          <p>
            O xVault pode sincronizar variáveis automaticamente em diferentes
            ambientes.
          </p>
          <CodeBlock
            language="ts"
            code={`await vault.env.sync({
  environment: "production",
})`}
          />
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* xVault — Rotação de segredos                                  */
/* ============================================================= */

export const xvaultRotation: DocContent = {
  eyebrow: "xVault",
  title: "Rotação de segredos",
  description:
    "Atualize credenciais sensíveis automaticamente para reduzir o risco de exposição prolongada.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <p>
            A rotação de segredos garante que credenciais sensíveis sejam
            atualizadas automaticamente, reduzindo o risco de exposição
            prolongada.
          </p>
          <FeatureGrid
            items={[
              "Rotação automática programada",
              "Compatível com APIs externas",
              "Versionamento seguro",
              "Rollback instantâneo",
              "Audit logging integrado",
              "Zero downtime",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "configurar",
      title: "Configuração da rotação",
      content: (
        <Prose>
          <p>Configure rotação automática de um segredo:</p>
          <CodeBlock
            language="ts"
            code={`await vault.secrets.rotate({
  key: "STRIPE_SECRET_KEY",
  interval: "7d",
})`}
          />
        </Prose>
      ),
    },
    {
      id: "manual",
      title: "Rotação manual",
      content: (
        <Prose>
          <p>Você também pode forçar uma rotação manual:</p>
          <CodeBlock
            language="ts"
            code={`await vault.secrets.rotate({
  key: "DATABASE_URL",
  force: true,
})`}
          />
        </Prose>
      ),
    },
    {
      id: "boas-praticas",
      title: "Boas práticas",
      content: (
        <Prose>
          <FeatureGrid
            columns={1}
            items={[
              "Rotacione segredos críticos semanalmente",
              "Use intervalos diferentes por tipo de segredo",
              "Combine rotação com audit logs",
              "Nunca reutilize versões antigas em produção",
            ]}
          />
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* xVault — Audit logs                                           */
/* ============================================================= */

export const xvaultAuditLogs: DocContent = {
  eyebrow: "xVault",
  title: "Audit logs",
  description:
    "Registros imutáveis de todas as ações realizadas no xVault, garantindo rastreabilidade e conformidade.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <p>
            Audit logs registram todas as ações realizadas no xVault, garantindo
            rastreabilidade total e conformidade de segurança.
          </p>
          <FeatureGrid
            items={[
              "Logs imutáveis",
              "Rastreamento de acessos",
              "Histórico de segredos",
              "Eventos de segurança",
              "Exportação de logs",
              "Compliance ready",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "listar",
      title: "Listando logs",
      content: (
        <Prose>
          <p>Recupere eventos do sistema:</p>
          <CodeBlock
            language="ts"
            code={`const logs = await vault.audit.list({
  limit: 50,
  type: "secret.access",
})`}
          />
        </Prose>
      ),
    },
    {
      id: "tipos",
      title: "Tipos de eventos",
      content: (
        <Prose>
          <DefinitionList
            items={[
              { term: "secret.created", description: "Um segredo foi criado." },
              { term: "secret.updated", description: "Um segredo foi atualizado." },
              { term: "secret.deleted", description: "Um segredo foi removido." },
              { term: "secret.access", description: "Um segredo foi lido." },
              { term: "auth.login", description: "Autenticação bem-sucedida." },
              { term: "auth.failed", description: "Tentativa de autenticação falhou." },
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "seguranca",
      title: "Importância de segurança",
      content: (
        <Prose>
          <p>
            Audit logs são essenciais para detectar acessos indevidos e
            investigar incidentes.
          </p>
          <Callout variant="warning">
            Logs não podem ser alterados ou apagados, garantindo integridade
            total.
          </Callout>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* xVault — Tratamento de erros                                  */
/* ============================================================= */

export const xvaultErrors: DocContent = {
  eyebrow: "xVault",
  title: "Tratamento de erros",
  description:
    "Erros tipados e códigos padronizados para facilitar debugging e controle de fluxo em aplicações críticas.",
  updatedAt: "2026-06-08",
  sections: [
    {
      id: "visao-geral",
      title: "Visão geral",
      content: (
        <Prose>
          <p>
            O xVault utiliza erros tipados para facilitar debugging e controle
            de fluxo em aplicações críticas.
          </p>
          <FeatureGrid
            items={[
              "Erros tipados",
              "Códigos padronizados",
              "Mensagens consistentes",
              "Fácil debugging",
              "Integração com logs",
              "Segurança de execução",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "try-catch",
      title: "Tratando erros",
      content: (
        <Prose>
          <p>Use blocos try/catch para capturar erros do SDK:</p>
          <CodeBlock
            language="ts"
            code={`try {
  const secret = await vault.secrets.get({
    key: "DATABASE_URL",
  })

  console.log(secret)
} catch (error: any) {
  if (error.code === "SECRET_NOT_FOUND") {
    console.log("Secret não encontrado")
  }

  if (error.code === "UNAUTHORIZED") {
    console.log("API Key inválida")
  }
}`}
          />
        </Prose>
      ),
    },
    {
      id: "codigos",
      title: "Códigos de erro",
      content: (
        <Prose>
          <DefinitionList
            items={[
              { term: "SECRET_NOT_FOUND", description: "Segredo não existe no vault." },
              { term: "UNAUTHORIZED", description: "Credenciais inválidas ou expiradas." },
              { term: "RATE_LIMITED", description: "Muitas requisições em pouco tempo." },
              { term: "INVALID_REQUEST", description: "Parâmetros inválidos enviados." },
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "boas-praticas",
      title: "Boas práticas",
      content: (
        <Prose>
          <FeatureGrid
            columns={1}
            items={[
              "Sempre trate SECRET_NOT_FOUND separadamente",
              "Evite expor erros internos ao cliente",
              "Registre falhas em logs auditáveis",
              "Implemente retry em RATE_LIMITED",
            ]}
          />
        </Prose>
      ),
    },
  ],
}
