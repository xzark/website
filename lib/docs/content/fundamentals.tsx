import {
  Callout,
  CardGrid,
  CardLink,
  DefinitionList,
  FeatureGrid,
  Lead,
  Prose,
} from "@/components/docs/doc-primitives"
import { CodeBlock } from "@/components/docs/code-block"
import type { DocContent } from "@/lib/docs/types"

/* ============================================================= */
/* Conceitos principais                                          */
/* ============================================================= */

export const conceitos: DocContent = {
  eyebrow: "Fundamentos",
  title: "Conceitos principais",
  description:
    "Os modelos fundamentais que regem toda a plataforma xZark: segredos, versões, ambientes, escopos e auditoria.",
  updatedAt: "2026-06-09",
  sections: [
    {
      id: "modelo",
      title: "Modelo mental",
      content: (
        <Prose>
          <Lead>
            Entender alguns conceitos centrais torna o uso de qualquer SDK da
            xZark previsível e consistente.
          </Lead>
          <DefinitionList
            items={[
              {
                term: "Segredo",
                description:
                  "Par chave/valor criptografado — credenciais, tokens ou variáveis sensíveis.",
              },
              {
                term: "Versão",
                description:
                  "Cada alteração de um segredo gera uma nova versão imutável, permitindo rollback.",
              },
              {
                term: "Ambiente",
                description:
                  "Isolamento lógico (ex: development, staging, production) para os mesmos segredos.",
              },
              {
                term: "Escopo",
                description:
                  "Conjunto de permissões associado a uma API Key, definindo o que ela pode acessar.",
              },
              {
                term: "Audit log",
                description:
                  "Registro imutável de toda ação realizada, essencial para conformidade.",
              },
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "ciclo-de-vida",
      title: "Ciclo de vida de um segredo",
      content: (
        <Prose>
          <p>
            Um segredo passa por criação, leitura, atualização (gerando versões)
            e, eventualmente, rotação ou remoção. Toda transição é auditada.
          </p>
          <FeatureGrid
            items={[
              "Criação criptografada",
              "Versionamento automático",
              "Leitura escopada por ambiente",
              "Rotação programada ou manual",
              "Rollback para versões anteriores",
              "Remoção controlada e auditada",
            ]}
          />
        </Prose>
      ),
    },
    {
      id: "seguranca",
      title: "Modelo de segurança",
      content: (
        <Prose>
          <p>
            A plataforma assume zero-trust: toda requisição é autenticada e
            autorizada, e segredos nunca trafegam ou repousam em texto plano.
          </p>
          <Callout variant="tip" title="Boa prática">
            Use ambientes separados e escopos mínimos por aplicação. Isso limita
            o impacto caso uma credencial seja comprometida.
          </Callout>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Exemplos práticos                                             */
/* ============================================================= */

export const exemplos: DocContent = {
  eyebrow: "Fundamentos",
  title: "Exemplos práticos",
  description:
    "Receitas prontas para cenários comuns: carregar configuração, integrar com CI/CD e proteger rotas.",
  updatedAt: "2026-06-09",
  sections: [
    {
      id: "config-runtime",
      title: "Carregar configuração em runtime",
      content: (
        <Prose>
          <p>
            Em vez de manter um <code>.env</code> em produção, carregue valores
            diretamente do vault no boot da aplicação:
          </p>
          <CodeBlock
            language="ts"
            filename="config.ts"
            code={`import { vault } from "@/lib/xvault"

export async function loadConfig() {
  const [dbUrl, jwtSecret] = await Promise.all([
    vault.env.get("DATABASE_URL"),
    vault.env.get("JWT_SECRET"),
  ])

  return { dbUrl, jwtSecret }
}`}
          />
        </Prose>
      ),
    },
    {
      id: "ci-cd",
      title: "Integração com CI/CD",
      content: (
        <Prose>
          <p>
            Sincronize segredos para o ambiente de deploy sem expô-los em logs
            do pipeline:
          </p>
          <CodeBlock
            language="bash"
            filename=".github/workflows/deploy.yml"
            code={`- name: Sync secrets
  run: npx @xvault/node sync --environment production
  env:
    XVAULT_API_KEY: \${{ secrets.XVAULT_API_KEY }}`}
          />
          <Callout variant="warning">
            Garanta que a API Key do CI tenha escopo restrito ao ambiente de
            destino.
          </Callout>
        </Prose>
      ),
    },
    {
      id: "mais",
      title: "Mais exemplos",
      content: (
        <Prose>
          <CardGrid>
            <CardLink
              href="/docs/xvault/rotacao"
              title="Rotação automática"
              description="Programe a rotação de credenciais críticas."
            />
            <CardLink
              href="/docs/xvault/erros"
              title="Tratamento de erros"
              description="Padrões robustos de captura e retry."
            />
          </CardGrid>
        </Prose>
      ),
    },
  ],
}

/* ============================================================= */
/* Referência técnica                                            */
/* ============================================================= */

export const referencia: DocContent = {
  eyebrow: "Fundamentos",
  title: "Referência técnica",
  description:
    "Assinaturas, parâmetros e respostas das principais APIs dos SDKs da xZark.",
  updatedAt: "2026-06-09",
  sections: [
    {
      id: "client",
      title: "Inicialização do client",
      content: (
        <Prose>
          <CodeBlock
            language="ts"
            code={`new XVault({
  apiKey: string,
  environment?: "development" | "staging" | "production",
  timeout?: number,
  retries?: number,
})`}
          />
        </Prose>
      ),
    },
    {
      id: "secrets-api",
      title: "API de segredos",
      content: (
        <Prose>
          <CodeBlock
            language="ts"
            code={`vault.secrets.set({ key, value })       // cria ou atualiza
vault.secrets.get({ key })               // lê o valor atual
vault.secrets.list({ environment })      // lista por ambiente
vault.secrets.delete({ key })            // remove permanentemente
vault.secrets.rotate({ key, interval })  // configura rotação`}
          />
          <Callout variant="info">
            A referência detalhada de cada método, com parâmetros e respostas,
            está nas páginas específicas do xVault.
          </Callout>
        </Prose>
      ),
    },
  ],
}
