import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DocsPage } from "@/components/docs/docs-page";

import { CodeBlock } from "@/components/docs/code-block";
import { InstallTabs } from "@/components/docs/install-tabs";
import type { DocNavItem } from "@/components/docs/docs-page";

type DocSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type DocPageContent = {
  title: string;
  description: string;
  category: string;
  sections: DocSection[];
};

type DocsTree = Record<string, Record<string, Record<string, DocPageContent>>>;

/* =========================================================
   1. CONTENT (SOURCE OF TRUTH)
========================================================= */

const docs: DocsTree = {
  xauth: {
    nodejs: {
      "getting-started": {
        title: "Getting Started",
        description:
          "Integre autenticação moderna em aplicações Node.js utilizando o SDK oficial do xAuth.",
        category: "Node.js",
        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <p>SDK Node.js do xAuth para autenticação moderna em APIs.</p>
              </div>
            ),
          },
        ],
      },
      middleware: {
        title: "Middleware",
        description: "Proteja rotas automaticamente.",
        category: "Node.js",
        sections: [],
      },
      sessions: {
        title: "Sessões",
        description: "Gerencie sessões e tokens.",
        category: "Node.js",
        sections: [],
      },
      rbac: {
        title: "RBAC",
        description: "Controle de permissões.",
        category: "Node.js",
        sections: [],
      },
    },
  },

  xvault: {
    nodejs: {
      "getting-started": {
        title: "Getting Started",
        description: "xVault secure secrets manager.",
        category: "Node.js",

        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border/50 bg-muted/20 p-6">
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">O que é o xVault?</h3>

                    <p className="text-sm leading-7 text-foreground/80">
                      O xVault é um sistema seguro de gerenciamento de segredos
                      desenvolvido para aplicações modernas. Ele permite
                      armazenar, versionar e proteger informações sensíveis como
                      API Keys, tokens, credenciais de banco de dados e
                      variáveis críticas.
                    </p>

                    <p className="text-sm leading-7 text-foreground/80">
                      Diferente de variáveis de ambiente tradicionais, o xVault
                      oferece criptografia forte, controle de acesso e histórico
                      completo de alterações.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Criptografia AES-256",
                    "Versionamento automático",
                    "Controle de acesso por API Key",
                    "Audit logs completos",
                    "SDK para Node.js",
                    "Integração com CI/CD",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm text-foreground/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "installation",
            title: "Instalação",
            content: (
              <div className="space-y-6">
                <p>Instale o SDK oficial do xVault no seu projeto Node.js.</p>

                <InstallTabs command="@xvault/node" defaultRuntime="nodejs" />

                <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <p className="text-sm text-muted-foreground">
                    Requer Node.js 18 ou superior. Funciona em servidores,
                    serverless e edge runtimes.
                  </p>
                </div>
              </div>
            ),
          },

          {
            id: "initialization",
            title: "Inicialização",
            content: (
              <div className="space-y-6">
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

                <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                  <p className="text-sm text-yellow-400">
                    Nunca exponha sua API Key no frontend ou repositórios
                    públicos.
                  </p>
                </div>
              </div>
            ),
          },

          {
            id: "first-secret",
            title: "Seu primeiro segredo",
            content: (
              <div className="space-y-6">
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

                <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <p className="text-sm text-foreground/80">
                    O segredo é automaticamente criptografado e versionado.
                  </p>
                </div>
              </div>
            ),
          },
        ],
      },
      "managing-secrets": {
        title: "Managing Secrets",
        description: "CRUD de segredos.",
        category: "Node.js",

        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <p>
                  O xVault permite gerenciar segredos de forma segura com
                  operações completas de CRUD (Create, Read, Update e Delete).
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Criação segura de segredos",
                    "Versionamento automático",
                    "Consulta por chave",
                    "Listagem por ambiente",
                    "Remoção controlada",
                    "Auditoria completa",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm text-foreground/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "create-secret",
            title: "Criando segredos",
            content: (
              <div className="space-y-6">
                <p>
                  Para criar um segredo, utilize{" "}
                  <code>vault.secrets.set()</code>.
                </p>

                <CodeBlock
                  language="ts"
                  filename="create-secret.ts"
                  code={`await vault.secrets.set({
  key: "DATABASE_URL",
  value: "postgres://localhost:5432/app",
})`}
                />

                <div className="rounded-xl border border-border/50 bg-muted/20 p-4">
                  <p className="text-sm text-foreground/80">
                    Cada segredo é automaticamente criptografado e versionado.
                  </p>
                </div>
              </div>
            ),
          },

          {
            id: "update-secret",
            title: "Atualizando segredos",
            content: (
              <div className="space-y-6">
                <p>
                  Atualizar um segredo cria automaticamente uma nova versão.
                </p>

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
              </div>
            ),
          },

          {
            id: "list-secrets",
            title: "Listando segredos",
            content: (
              <div className="space-y-6">
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
  {
    "key": "DATABASE_URL",
    "version": 3
  },
  {
    "key": "JWT_SECRET",
    "version": 1
  }
]`}
                />
              </div>
            ),
          },

          {
            id: "delete-secret",
            title: "Removendo segredos",
            content: (
              <div className="space-y-6">
                <p>Remova um segredo permanentemente do vault.</p>

                <CodeBlock
                  language="ts"
                  filename="delete-secret.ts"
                  code={`await vault.secrets.delete({
  key: "OLD_SECRET",
})`}
                />

                <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-sm text-red-300">
                    Essa ação é irreversível e remove todas as versões do
                    segredo.
                  </p>
                </div>
              </div>
            ),
          },
        ],
      },
      "environment-variables": {
        title: "Environment Variables",
        description: "Env config segura.",
        category: "Node.js",

        sections: [
          {
            id: "why",
            title: "Por que usar xVault?",
            content: (
              <div className="space-y-6">
                <p>
                  Variáveis de ambiente tradicionais são inseguras em escala. O
                  xVault centraliza e protege esses valores com criptografia e
                  controle de acesso.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Sem exposição em .env",
                    "Controle por ambiente",
                    "Versionamento automático",
                    "Audit logs",
                    "Revogação instantânea",
                    "Segurança em runtime",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "setup",
            title: "Configuração inicial",
            content: (
              <div className="space-y-6">
                <p>Defina sua API Key no ambiente seguro:</p>

                <CodeBlock
                  language="bash"
                  filename=".env"
                  code={`XVAULT_API_KEY=your_key_here`}
                />
              </div>
            ),
          },

          {
            id: "usage",
            title: "Usando como env manager",
            content: (
              <div className="space-y-6">
                <p>Carregue variáveis diretamente do vault:</p>

                <CodeBlock
                  language="ts"
                  code={`const dbUrl = await vault.env.get("DATABASE_URL")

console.log(dbUrl)`}
                />
              </div>
            ),
          },

          {
            id: "sync",
            title: "Sincronização automática",
            content: (
              <div className="space-y-6">
                <p>
                  O xVault pode sincronizar variáveis automaticamente em
                  diferentes ambientes.
                </p>

                <CodeBlock
                  language="ts"
                  code={`await vault.env.sync({
  environment: "production",
})`}
                />
              </div>
            ),
          },
        ],
      },
      "secret-rotation": {
        title: "Secret Rotation",
        description: "Rotação automática de segredos.",
        category: "Node.js",

        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <p>
                  A rotação de segredos garante que credenciais sensíveis sejam
                  atualizadas automaticamente, reduzindo o risco de exposição
                  prolongada.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Rotação automática programada",
                    "Compatível com APIs externas",
                    "Versionamento seguro",
                    "Rollback instantâneo",
                    "Audit logging integrado",
                    "Zero downtime",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "setup",
            title: "Configuração da rotação",
            content: (
              <div className="space-y-6">
                <p>Configure rotação automática de um segredo:</p>

                <CodeBlock
                  language="ts"
                  code={`await vault.secrets.rotate({
  key: "STRIPE_SECRET_KEY",
  interval: "7d",
})`}
                />
              </div>
            ),
          },

          {
            id: "manual-rotation",
            title: "Rotação manual",
            content: (
              <div className="space-y-6">
                <p>Você também pode forçar uma rotação manual:</p>

                <CodeBlock
                  language="ts"
                  code={`await vault.secrets.rotate({
  key: "DATABASE_URL",
  force: true,
})`}
                />
              </div>
            ),
          },

          {
            id: "best-practices",
            title: "Boas práticas",
            content: (
              <div className="space-y-6">
                <div className="grid gap-3">
                  {[
                    "Rotacione segredos críticos semanalmente",
                    "Use intervalos diferentes por tipo de segredo",
                    "Combine rotação com audit logs",
                    "Nunca reutilize versões antigas em produção",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
      "audit-logs": {
        title: "Audit Logs",
        description: "Logs imutáveis.",
        category: "Node.js",

        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <p>
                  Audit logs registram todas as ações realizadas no xVault,
                  garantindo rastreabilidade total e conformidade de segurança.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Logs imutáveis",
                    "Rastreamento de acessos",
                    "Histórico de segredos",
                    "Eventos de segurança",
                    "Exportação de logs",
                    "Compliance ready",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "list-logs",
            title: "Listando logs",
            content: (
              <div className="space-y-6">
                <p>Recupere eventos do sistema:</p>

                <CodeBlock
                  language="ts"
                  code={`const logs = await vault.audit.list({
  limit: 50,
  type: "secret.access",
})`}
                />
              </div>
            ),
          },

          {
            id: "log-types",
            title: "Tipos de eventos",
            content: (
              <div className="space-y-6">
                <div className="grid gap-3">
                  {[
                    "secret.created",
                    "secret.updated",
                    "secret.deleted",
                    "secret.access",
                    "auth.login",
                    "auth.failed",
                  ].map((event) => (
                    <div
                      key={event}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      <code>{event}</code>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "security-value",
            title: "Importância de segurança",
            content: (
              <div className="space-y-6">
                <p>
                  Audit logs são essenciais para detectar acessos indevidos e
                  investigar incidentes.
                </p>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-200">
                  Logs não podem ser alterados ou apagados, garantindo
                  integridade total.
                </div>
              </div>
            ),
          },
        ],
      },
      "error-handling": {
        title: "Error Handling",
        description: "Tratamento de erros do SDK.",
        category: "Node.js",

        sections: [
          {
            id: "overview",
            title: "Visão geral",
            content: (
              <div className="space-y-6">
                <p>
                  O xVault utiliza erros tipados para facilitar debugging e
                  controle de fluxo em aplicações críticas.
                </p>

                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Erros tipados",
                    "Códigos padronizados",
                    "Mensagens consistentes",
                    "Fácil debugging",
                    "Integração com logs",
                    "Segurança de execução",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "try-catch",
            title: "Tratando erros",
            content: (
              <div className="space-y-6">
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
              </div>
            ),
          },

          {
            id: "error-codes",
            title: "Códigos de erro",
            content: (
              <div className="space-y-6">
                <div className="grid gap-3">
                  {[
                    {
                      code: "SECRET_NOT_FOUND",
                      desc: "Segredo não existe no vault.",
                    },
                    {
                      code: "UNAUTHORIZED",
                      desc: "Credenciais inválidas ou expiradas.",
                    },
                    {
                      code: "RATE_LIMITED",
                      desc: "Muitas requisições em pouco tempo.",
                    },
                    {
                      code: "INVALID_REQUEST",
                      desc: "Parâmetros inválidos enviados.",
                    },
                  ].map((err) => (
                    <div
                      key={err.code}
                      className="rounded-xl border border-border/50 bg-muted/20 p-4"
                    >
                      <div className="space-y-2">
                        <code className="text-sm font-medium">{err.code}</code>
                        <p className="text-sm text-foreground/70">{err.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },

          {
            id: "best-practices",
            title: "Boas práticas",
            content: (
              <div className="space-y-6">
                <div className="grid gap-3">
                  {[
                    "Sempre trate SECRET_NOT_FOUND separadamente",
                    "Evite expor erros internos ao cliente",
                    "Registre falhas em logs auditáveis",
                    "Implemente retry em RATE_LIMITED",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-border/50 bg-muted/20 px-4 py-3 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
        ],
      },
    },
  },
};

/* =========================================================
   2. ORDER REGISTRY (SINGLE SOURCE FOR NAV)
========================================================= */

const order = {
  xauth: {
    nodejs: ["getting-started", "middleware", "sessions", "rbac"],
  },
  xvault: {
    nodejs: [
      "getting-started",
      "managing-secrets",
      "environment-variables",
      "secret-rotation",
      "audit-logs",
      "error-handling",
    ],
  },
} as const;

/* =========================================================
   3. HELPERS (AUTO NAVIGATION GENERATOR)
========================================================= */

function formatTitle(slug: string) {
  return slug
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

function buildSidebar(
  product: keyof typeof order,
  category: keyof (typeof order)["xauth"],
  basePath: string,
): DocNavItem[] {
  const pages = order[product][category];

  return pages.map((page) => ({
    title: formatTitle(page),
    href: `${basePath}/${page}`,
  }));
}

function buildNavigation(
  product: keyof typeof order,
  category: keyof (typeof order)["xauth"],
  page: string,
  basePath: string,
) {
  const pages = order[product][category];

  const index = pages.findIndex((p) => p === page);

  return {
    previousPage:
      index > 0
        ? {
            title: formatTitle(pages[index - 1]),
            href: `${basePath}/${pages[index - 1]}`,
          }
        : undefined,

    nextPage:
      index < pages.length - 1
        ? {
            title: formatTitle(pages[index + 1]),
            href: `${basePath}/${pages[index + 1]}`,
          }
        : undefined,
  };
}

/* =========================================================
   4. GET DOC
========================================================= */

function getDoc(product: string, category: string, page: string) {
  return docs?.[product]?.[category]?.[page] ?? null;
}

/* =========================================================
   5. METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string; category: string; page: string }>;
}): Promise<Metadata> {
  const { product, category, page } = await params;

  const doc = getDoc(product, category, page);

  if (!doc) return {};

  return {
    title: `${doc.title} | Docs`,
    description: doc.description,
  };
}

/* =========================================================
   6. PAGE RENDER
========================================================= */

export default async function DocPage({
  params,
}: {
  params: Promise<{ product: string; category: string; page: string }>;
}) {
  const { product, category, page } = await params;

  const doc = getDoc(product, category, page);

  if (!doc) notFound();

  const basePath = `/docs/${product}/${category}`;

  const navigation = buildNavigation(
    product as any,
    category as any,
    page,
    basePath,
  );

  const sidebar = buildSidebar(product as any, category as any, basePath);

  return (
    <DocsPage
      eyebrow={doc.category}
      title={doc.title}
      description={doc.description}
      sections={doc.sections}
      sidebar={sidebar}
      previousPage={navigation.previousPage}
      nextPage={navigation.nextPage}
    />
  );
}
