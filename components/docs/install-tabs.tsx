"use client";

import * as React from "react";

import { CodeBlock } from "./code-block";

type PackageManager =
  | "npm"
  | "pnpm"
  | "yarn"
  | "bun";

interface RuntimeOption {
  id: string;

  title: string;

  description?: string;
}

interface InstallTabsProps {
  /**
   * Ex:
   * xauth init
   * xauth add middleware
   * xauth generate secret
   */
  command: string;

  /**
   * Ex:
   * nextjs
   * nodejs
   */
  defaultRuntime?: string;

  runtimes?: RuntimeOption[];
}

const packageManagers = {
  npm: {
    label: "npm",

    template: (command: string) =>
      `npx ${command}`,
  },

  pnpm: {
    label: "pnpm",

    template: (command: string) =>
      `pnpm dlx ${command}`,
  },

  yarn: {
    label: "yarn",

    template: (command: string) =>
      `yarn dlx ${command}`,
  },

  bun: {
    label: "bun",

    template: (command: string) =>
      `bunx ${command}`,
  },
};

const defaultRuntimes: RuntimeOption[] = [
  {
    id: "nextjs",

    title: "Next.js",

    description:
      "App Router, Middleware e Server Actions.",
  },

  {
    id: "nodejs",

    title: "Node.js",

    description:
      "APIs, microsserviços e aplicações backend.",
  },

  {
    id: "express",

    title: "Express",

    description:
      "Middleware plug-and-play para Express.",
  },

  {
    id: "fastify",

    title: "Fastify",

    description:
      "Alta performance e tipagem moderna.",
  },

  {
    id: "hono",

    title: "Hono",

    description:
      "Edge runtime e aplicações ultrarrápidas.",
  },
];

export function InstallTabs({
  command,

  defaultRuntime = "nextjs",

  runtimes = defaultRuntimes,
}: InstallTabsProps) {
  const [activeManager, setActiveManager] =
    React.useState<PackageManager>("pnpm");

  const [activeRuntime, setActiveRuntime] =
    React.useState(defaultRuntime);

  const selectedManager =
    packageManagers[activeManager];

  const runtimeFlag = activeRuntime
    ? ` --runtime ${activeRuntime}`
    : "";

  const finalCommand =
    selectedManager.template(command) +
    runtimeFlag;

  return (
    <div className="overflow-hidden rounded-2xl border border-border/50 bg-[#050505]">
      {/* Header */}
      <div className="border-b border-border/50">
        {/* Package Managers */}
        <div className="flex items-center gap-1 px-2 pt-2">
          {Object.entries(packageManagers).map(
            ([key, manager]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveManager(
                    key as PackageManager
                  )
                }
                className={`rounded-xl px-4 py-2 font-mono text-[11px] transition-all ${
                  activeManager === key
                    ? "bg-background text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {manager.label}
              </button>
            )
          )}
        </div>
      </div>

      {/* Command */}
      <CodeBlock
        language="bash"
        code={finalCommand}
      />
    </div>
  );
}