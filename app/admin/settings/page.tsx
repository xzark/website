import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const settings = [
  {
    title: "Geral",
    description: "Identidade da organização e preferências de localização.",
    fields: [
      { id: "org", label: "Nome da organização", value: "xZark Operations" },
      { id: "domain", label: "Domínio principal", value: "xzark.co" },
      { id: "tz", label: "Fuso horário", value: "America/Sao_Paulo" },
    ],
  },
  {
    title: "Segurança",
    description: "Políticas de autenticação e proteção de conta.",
    toggles: [
      { id: "mfa", label: "MFA obrigatório", desc: "Exigir TOTP ou passkey para todos.", on: true },
      { id: "passkey", label: "Passkeys preferenciais", desc: "Sugerir passkey no primeiro login.", on: true },
      { id: "ip", label: "Allowlist de IP", desc: "Bloquear acesso fora dos blocos definidos.", on: false },
      { id: "session", label: "Sessões curtas", desc: "Expirar sessão após 8 horas.", on: true },
    ],
  },
  {
    title: "Notificações",
    description: "Controle de alertas e canais de comunicação.",
    toggles: [
      { id: "critical", label: "Alertas críticos", desc: "Email + SMS para severidade crítica.", on: true },
      { id: "weekly", label: "Resumo semanal", desc: "Relatório consolidado às segundas.", on: true },
      { id: "marketing", label: "Atualizações de produto", desc: "Novidades e changelog.", on: false },
    ],
  },
] as const

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Sistema · Configurações
        </p>
        <h1 className="mt-2 font-serif text-4xl font-light tracking-tight md:text-5xl">
          Preferências da <span className="italic text-primary">organização</span>
        </h1>
      </div>

      <div className="flex flex-col gap-4">
        {settings.map((section) => (
          <section
            key={section.title}
            className="rounded-lg border border-border/60 bg-card/40 backdrop-blur-xl"
          >
            <div className="border-b border-border/60 px-6 py-5">
              <h2 className="font-serif text-xl font-light tracking-tight">{section.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{section.description}</p>
            </div>

            <div className="flex flex-col gap-5 p-6">
              {"fields" in section &&
                section.fields?.map((f) => (
                  <div key={f.id} className="grid gap-2 md:grid-cols-3 md:items-center md:gap-6">
                    <Label
                      htmlFor={f.id}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                    >
                      {f.label}
                    </Label>
                    <Input
                      id={f.id}
                      defaultValue={f.value}
                      className="md:col-span-2 border-border/60 bg-background/40 font-mono text-sm"
                    />
                  </div>
                ))}

              {"toggles" in section &&
                section.toggles?.map((t) => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between gap-4 border-t border-border/40 pt-4 first:border-t-0 first:pt-0"
                  >
                    <div className="flex flex-col gap-1">
                      <Label htmlFor={t.id} className="text-sm">
                        {t.label}
                      </Label>
                      <span className="text-xs text-muted-foreground">{t.desc}</span>
                    </div>
                    <Switch id={t.id} defaultChecked={t.on} />
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-border/60 bg-background/20 px-6 py-3">
              <Button variant="ghost" size="sm" className="font-mono text-xs">
                Cancelar
              </Button>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs"
              >
                Salvar alterações
              </Button>
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
