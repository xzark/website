import Link from "next/link";
import { notFound } from "next/navigation";

import { DocsPage } from "@/components/docs/docs-page";

const products = {
  xauth: {
    title: "xAuth",

    description:
      "Plataforma enterprise de autenticação e gerenciamento de identidade.",

    frameworks: [
      {
        title: "Node.JS",
        description: "SDK Node.JS oficial",
        href: "/docs/xauth/nodejs/getting-started",
      },
    ],
  },
  xvault: {
    title: "xVault",

    description:
      "Gerenciamento de segredos e variáveis de ambiente para equipes e organizações.",

    frameworks: [
      {
        title: "Node.JS",
        description: "SDK Node.JS oficial",
        href: "/docs/xvault/nodejs/getting-started",
      },
    ],
  },
};

type Props = {
  params: Promise<{
    product: string;
  }>;
};

export default async function ProductDocsPage({ params }: Props) {
  const { product } = await params;

  const doc = products[product as keyof typeof products];

  if (!doc) {
    notFound();
  }

  return (
    <DocsPage
      eyebrow="Documentation"
      title={doc.title}
      description={doc.description}
      sections={[
        {
          id: "frameworks",

          title: "SDKs & Frameworks",

          content: (
            <div className="grid gap-4 md:grid-cols-2">
              {doc.frameworks.map((framework) => (
                <Link
                  key={framework.href}
                  href={framework.href}
                  className="rounded-2xl border border-border p-5 transition-colors hover:border-primary"
                >
                  <h3 className="text-lg font-medium">{framework.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {framework.description}
                  </p>
                </Link>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
