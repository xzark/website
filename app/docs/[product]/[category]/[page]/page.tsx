// app/docs/[...slug]/page.tsx

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  DocsPage,
  type DocsSection,
  type DocsNavigationItem,
} from "@/components/docs/docs-page";

type DocPageContent = {
  title: string;
  description: string;

  category: string;

  sections: DocsSection[];

  sidebar?: DocsNavigationItem[];

  previousPage?: DocsNavigationItem;
  nextPage?: DocsNavigationItem;
};

type DocsTree = {
  [product: string]: {
    [category: string]: {
      [page: string]: DocPageContent;
    };
  };
};

const docs: DocsTree = {
  xauth: {
    react: {
      "getting-started": {
        title: "Getting Started",
        category: "React",
        description:
          "Integre o xAuth em aplicações React ou Next.js usando o SDK oficial com hooks e provider.",

        sections: [
          {
            id: "installation",
            title: "Instalação",
            content: (
              <div className="space-y-4">
                <p>
                  Instale o SDK React oficial do xAuth. Ele fornece{" "}
                  <b>AuthProvider</b> e <b>useAuth</b>
                  para gerenciamento completo de autenticação.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                    Terminal
                  </div>

                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`npm install @xzark/xauth-react`}</code>
                  </pre>
                </div>

                <p className="text-sm text-zinc-400">
                  Ou com pnpm (recomendado em monorepos):
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`pnpm add @xzark/xauth-react`}</code>
                  </pre>
                </div>
              </div>
            ),
          },

          {
            id: "usage",
            title: "Uso básico",
            content: (
              <div className="space-y-4">
                <p>
                  Envolva sua aplicação com o <b>AuthProvider</b> e use o hook{" "}
                  <b>useAuth</b>.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`import { AuthProvider, useAuth } from "@xzark/xauth-react"

function App() {
  return (
    <AuthProvider apiKey="your_api_key">
      <Page />
    </AuthProvider>
  )
}

function Page() {
  const { user, signIn, signOut } = useAuth()

  return user ? (
    <>
      <p>Logado como {user.email}</p>
      <button onClick={signOut}>Sair</button>
    </>
  ) : (
    <button
      onClick={() =>
        signIn({ email: "test@test.com", password: "123456" })
      }
    >
      Entrar
    </button>
  )
}`}</code>
                  </pre>
                </div>
              </div>
            ),
          },

          {
            id: "concepts",
            title: "Conceito",
            content: (
              <div className="space-y-4">
                <p>
                  O xAuth React SDK foi projetado para funcionar como uma camada
                  de abstração de autenticação moderna, similar a soluções como
                  Clerk.
                </p>

                <ul className="list-disc pl-5 text-sm text-zinc-300 space-y-2">
                  <li>
                    <b>AuthProvider</b> → gerencia estado global de autenticação
                  </li>
                  <li>
                    <b>useAuth</b> → acesso reativo ao usuário e sessão
                  </li>
                  <li>
                    <b>Session-based</b> → controle de login/logout persistente
                  </li>
                  <li>
                    <b>Framework agnostic core</b> → compatível com React e
                    Next.js
                  </li>
                </ul>
              </div>
            ),
          },
        ],
      },
    },
    nextjs: {
      "getting-started": {
        title: "Getting Started",

        category: "Next.js",

        description:
          "Configure o xAuth rapidamente em aplicações Next.js App Router.",

        nextPage: {
          title: "Middleware",
          href: "/docs/xauth/nextjs/middleware",
        },

        sidebar: [
          {
            title: "Instalação",
            href: "#installation",
          },

          {
            title: "Variáveis",
            href: "#environment",
          },

          {
            title: "Inicialização",
            href: "#initialization",
          },

          {
            title: "Proteção de Rotas",
            href: "#route-protection",
          },
        ],

        sections: [
          {
            id: "installation",

            title: "Instalação",

            content: (
              <div className="space-y-4">
                <p>
                  Instale o SDK oficial do xAuth utilizando npm, pnpm ou yarn.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                    Terminal
                  </div>

                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`npm install @xzark/xauth`}</code>
                  </pre>
                </div>
              </div>
            ),
          },

          {
            id: "environment",

            title: "Variáveis de Ambiente",

            content: (
              <div className="space-y-4">
                <p>
                  Configure as credenciais do projeto utilizando variáveis de
                  ambiente.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                    .env.local
                  </div>

                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`XAUTH_SECRET=your_secret
XAUTH_PROJECT_ID=your_project_id
XAUTH_PUBLIC_KEY=your_public_key`}</code>
                  </pre>
                </div>

                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
                  <p className="text-sm text-amber-200">
                    Nunca exponha sua Secret Key no frontend.
                  </p>
                </div>
              </div>
            ),
          },

          {
            id: "initialization",

            title: "Inicialização",

            content: (
              <div className="space-y-4">
                <p>
                  Inicialize o client do xAuth no servidor para validar sessões
                  e usuários autenticados.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                    lib/xauth.ts
                  </div>

                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`import { XAuth } from "@xzark/xauth"

export const xauth = new XAuth({
  secret: process.env.XAUTH_SECRET!,
  projectId: process.env.XAUTH_PROJECT_ID!,
})`}</code>
                  </pre>
                </div>
              </div>
            ),
          },

          {
            id: "route-protection",

            title: "Proteção de Rotas",

            content: (
              <div className="space-y-4">
                <p>
                  Utilize middleware para proteger rotas privadas da aplicação.
                </p>

                <div className="overflow-hidden rounded-2xl border border-border bg-black">
                  <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                    middleware.ts
                  </div>

                  <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                    <code>{`import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("xauth_token")

  if (!token) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*"],
}`}</code>
                  </pre>
                </div>
              </div>
            ),
          },
        ],
      },

      middleware: {
        title: "Middleware",

        category: "Next.js",

        description:
          "Proteja rotas privadas utilizando middleware edge no Next.js.",

        previousPage: {
          title: "Getting Started",
          href: "/docs/xauth/nextjs/getting-started",
        },

        nextPage: {
          title: "Server Actions",
          href: "/docs/xauth/nextjs/server-actions",
        },

        sidebar: [
          {
            title: "Edge Runtime",
            href: "#edge-runtime",
          },

          {
            title: "Auth Guard",
            href: "#auth-guard",
          },
        ],

        sections: [
          {
            id: "edge-runtime",

            title: "Edge Runtime",

            content: (
              <p>
                O xAuth suporta execução em Edge Runtime para autenticação com
                baixa latência global.
              </p>
            ),
          },

          {
            id: "auth-guard",

            title: "Auth Guard",

            content: (
              <p>
                Utilize middleware centralizado para proteger múltiplas rotas de
                forma escalável.
              </p>
            ),
          },
        ],
      },
    },

    python: {
      quickstart: {
        title: "Quickstart Python",

        category: "Python",

        description:
          "Integre autenticação xAuth rapidamente em aplicações Python.",

        sidebar: [
          {
            title: "Instalação",
            href: "#installation",
          },

          {
            title: "Inicialização",
            href: "#initialization",
          },
        ],

        sections: [
          {
            id: "installation",

            title: "Instalação",

            content: (
              <div className="overflow-hidden rounded-2xl border border-border bg-black">
                <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                  Terminal
                </div>

                <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                  <code>{`pip install xzark-xauth`}</code>
                </pre>
              </div>
            ),
          },

          {
            id: "initialization",

            title: "Inicialização",

            content: (
              <div className="overflow-hidden rounded-2xl border border-border bg-black">
                <div className="border-b border-white/10 px-4 py-2 text-xs text-zinc-400">
                  main.py
                </div>

                <pre className="overflow-x-auto p-4 text-sm text-zinc-100">
                  <code>{`from xauth import XAuth

client = XAuth(
    secret="your_secret"
)`}</code>
                </pre>
              </div>
            ),
          },
        ],
      },
    },
  },
};

type Props = {
  params: Promise<{
    product: string;
    category: string;
    page: string;
  }>;
};

function getDoc(product: string, category: string, page: string) {
  if (!product || !category || !page) {
    return null;
  }

  return docs?.[product]?.[category]?.[page] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product, category, page } = await params;

  const doc = getDoc(product, category, page);

  if (!doc) {
    return {};
  }

  return {
    title: `${doc.title} | xZark Docs`,
    description: doc.description,
  };
}
export default async function DocPage({ params }: Props) {
  const { product, category, page } = await params;

  const doc = getDoc(product, category, page);

  if (!doc) {
    notFound();
  }

  return (
    <DocsPage
      eyebrow={doc.category}
      title={doc.title}
      description={doc.description}
      sections={doc.sections}
      previousPage={doc.previousPage}
      nextPage={doc.nextPage}
    />
  );
}
