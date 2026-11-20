import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { signInAction } from "@/app/admin/careers/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function CareersLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if(user){const {data}=await supabase.from("admin_users").select("user_id").eq("user_id",user.id).maybeSingle();if(data)redirect("/admin/careers")}
  const {error}=await searchParams
  return <main className="grid min-h-screen place-items-center px-4"><section className="w-full max-w-md border border-border bg-card p-7"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">xZark · Recrutamento</p><h1 className="mt-4 text-2xl font-light">Acesso administrativo</h1><p className="mt-2 text-sm text-muted-foreground">Entre com sua conta autorizada para gerenciar vagas e candidaturas.</p><form action={signInAction} className="mt-7 flex flex-col gap-4"><label className="flex flex-col gap-2 text-xs text-muted-foreground">E-mail<Input type="email" name="email" required autoComplete="username"/></label><label className="flex flex-col gap-2 text-xs text-muted-foreground">Senha<Input type="password" name="password" required autoComplete="current-password"/></label>{error&&<p role="alert" className="text-sm text-destructive">{error==="unauthorized"?"Esta conta não possui acesso de recrutador.":"Não foi possível autenticar. Verifique seus dados e tente novamente."}</p>}<Button type="submit" className="mt-2">Entrar</Button></form><p className="mt-5 text-xs leading-relaxed text-muted-foreground">O acesso é restrito a usuários previamente autorizados pela equipe xZark.</p></section></main>
}
