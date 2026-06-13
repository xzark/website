"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;

  language?: string;

  filename?: string;
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-[#050505]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-red-500/70" />
            <div className="h-2 w-2 rounded-full bg-yellow-500/70" />
            <div className="h-2 w-2 rounded-full bg-green-500/70" />
          </div>

          {filename && (
            <span className="font-mono text-xs text-muted-foreground">
              {filename}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            {language}
          </span>

          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-border/50 bg-background/40 px-2.5 py-1.5 text-xs text-muted-foreground transition-all hover:border-border hover:bg-background hover:text-foreground"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                Copied
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-5">
          <code className="font-mono text-[13px] leading-7 text-white/90">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}