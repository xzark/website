"use server"

/**
 * Server Actions de autenticação — xZark.
 *
 * Fronteira de escrita: login/logout e gestão de API keys. Toda ação valida
 * entrada com zod, aplica autorização e manipula o cookie de sessão via
 * next/headers. Retornam estado serializável para uso com useActionState.
 */
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getCurrentUser, requireRole } from "./index"
import { getAuthProvider } from "./provider"
import {
  SESSION_COOKIE,
  sessionCookieOptions,
  signSession,
} from "./session"
import { createApiKeySchema, loginSchema } from "./validation"

/** Estado retornado pela action de login. */
export interface LoginState {
  ok: boolean
  error?: string
  fieldErrors?: Partial<Record<"email" | "password", string>>
}

/** Rate limiting rudimentar em memória por processo (defesa em profundidade). */
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 8
const WINDOW_MS = 60_000

function rateLimited(key: string): boolean {
  const now = Date.now()
  const entry = attempts.get(key)
  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  entry.count += 1
  return entry.count > MAX_ATTEMPTS
}

/** Autentica o usuário e cria a sessão. Redireciona em caso de sucesso. */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const raw = {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  }
  const from = String(formData.get("from") ?? "") || "/dashboard"

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: LoginState["fieldErrors"] = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0]
      if (field === "email" || field === "password") fieldErrors[field] = issue.message
    }
    return { ok: false, fieldErrors }
  }

  if (rateLimited(parsed.data.email.toLowerCase())) {
    return { ok: false, error: "Muitas tentativas. Aguarde um minuto e tente novamente." }
  }

  const user = await getAuthProvider().verifyCredentials(parsed.data.email, parsed.data.password)
  if (!user) {
    return { ok: false, error: "Credenciais inválidas. Verifique e-mail e senha." }
  }

  const token = await signSession({
    sub: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  })

  const store = await cookies()
  store.set(SESSION_COOKIE, token, sessionCookieOptions())

  // Só permite redirecionamento interno para evitar open redirect.
  const dest = from.startsWith("/") && !from.startsWith("//") ? from : "/dashboard"
  redirect(dest)
}

/** Encerra a sessão e retorna à tela de login. */
export async function logoutAction(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
  redirect("/login")
}

/** Estado retornado pela action de criação de API key. */
export interface CreateApiKeyState {
  ok: boolean
  error?: string
  /** Segredo completo — exibido UMA única vez após criação. */
  secret?: string
  keyName?: string
}

/** Cria uma nova API key para o usuário atual (mínimo: developer). */
export async function createApiKeyAction(
  _prev: CreateApiKeyState,
  formData: FormData,
): Promise<CreateApiKeyState> {
  const user = await requireRole("developer")

  const raw = {
    name: String(formData.get("name") ?? ""),
    scopes: formData.getAll("scopes").map(String),
  }
  const parsed = createApiKeySchema.safeParse(raw)
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." }
  }

  const { record, secret } = await getAuthProvider().createApiKey(
    user.id,
    parsed.data.name,
    parsed.data.scopes,
  )

  revalidatePath("/dashboard/api-keys")
  return { ok: true, secret, keyName: record.name }
}

/** Revoga uma API key do usuário atual. */
export async function revokeApiKeyAction(formData: FormData): Promise<void> {
  const user = await requireRole("developer")
  const keyId = String(formData.get("keyId") ?? "")
  if (keyId) {
    await getAuthProvider().revokeApiKey(user.id, keyId)
    revalidatePath("/dashboard/api-keys")
  }
}

/** Utilitário para páginas: retorna o usuário atual (ou null). */
export async function currentUserAction() {
  return getCurrentUser()
}
