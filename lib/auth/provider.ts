/**
 * AuthProvider — contrato de persistência da autenticação.
 *
 * Toda leitura/escrita de usuários, credenciais e API keys passa por esta
 * interface. A implementação padrão (`InMemoryAuthProvider`) é auto-contida e
 * semeada com dados de demonstração — ideal para o estágio atual do produto.
 *
 * Para plugar o backend Go (xAuth) ou um banco (Neon/Postgres), basta criar
 * uma nova classe que implemente `AuthProvider` e trocar a instância exportada
 * em `getAuthProvider()`. Nenhum outro arquivo precisa mudar.
 */
import { hashPassword, verifyPassword } from "./password"
import type { ApiKeyRecord, UserRecord } from "./types"

export interface AuthProvider {
  verifyCredentials(email: string, password: string): Promise<UserRecord | null>
  getUserById(id: string): Promise<UserRecord | null>
  getUserByEmail(email: string): Promise<UserRecord | null>
  listApiKeys(userId: string): Promise<ApiKeyRecord[]>
  createApiKey(userId: string, name: string, scopes: string[]): Promise<{ record: ApiKeyRecord; secret: string }>
  revokeApiKey(userId: string, keyId: string): Promise<boolean>
}

/** Gera um id curto com prefixo (ex.: `usr_`, `key_`). */
function id(prefix: string): string {
  const rand = Array.from(crypto.getRandomValues(new Uint8Array(8)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
  return `${prefix}${rand}`
}

/** Semente de usuários — um por papel. Senha de demonstração: `xzark2025`. */
const SEED_USERS: Array<Omit<UserRecord, "passwordHash"> & { password: string }> = [
  {
    id: "usr_admin",
    email: "admin@xzark.co",
    name: "Ana Admin",
    role: "admin",
    password: "xzark2025",
    mfa: true,
    region: "sa-east-1",
    createdAt: "2024-01-04T10:00:00.000Z",
  },
  {
    id: "usr_dev",
    email: "dev@xzark.co",
    name: "Davi Developer",
    role: "developer",
    password: "xzark2025",
    mfa: true,
    region: "sa-east-1",
    createdAt: "2024-03-12T10:00:00.000Z",
  },
  {
    id: "usr_viewer",
    email: "viewer@xzark.co",
    name: "Vera Viewer",
    role: "viewer",
    password: "xzark2025",
    mfa: false,
    region: "us-east-1",
    createdAt: "2024-06-20T10:00:00.000Z",
  },
]

/**
 * Implementação em memória. Persiste durante o ciclo de vida do processo
 * (suficiente para preview/demo). Estado é reconstruído no boot.
 */
class InMemoryAuthProvider implements AuthProvider {
  private users = new Map<string, UserRecord>()
  private keys = new Map<string, ApiKeyRecord>()
  private ready: Promise<void>

  constructor() {
    this.ready = this.seed()
  }

  private async seed(): Promise<void> {
    for (const u of SEED_USERS) {
      const { password, ...rest } = u
      this.users.set(rest.id, { ...rest, passwordHash: await hashPassword(password) })
    }

    // API keys de demonstração pertencentes ao developer e ao admin.
    const seedKeys: ApiKeyRecord[] = [
      {
        id: "key_prod01",
        userId: "usr_dev",
        name: "Produção · Web",
        prefix: "xz_live_9f2a",
        last4: "b8d1",
        scopes: ["auth:read", "auth:write", "vault:read"],
        createdAt: "2024-08-01T09:30:00.000Z",
        lastUsedAt: "2025-01-18T22:14:00.000Z",
        revokedAt: null,
      },
      {
        id: "key_stg01",
        userId: "usr_dev",
        name: "Staging · CI",
        prefix: "xz_test_41c7",
        last4: "0a5e",
        scopes: ["auth:read", "vault:read"],
        createdAt: "2024-10-15T14:05:00.000Z",
        lastUsedAt: "2025-01-10T08:02:00.000Z",
        revokedAt: null,
      },
      {
        id: "key_adm01",
        userId: "usr_admin",
        name: "Ops · Terraform",
        prefix: "xz_live_c30d",
        last4: "77f2",
        scopes: ["auth:read", "auth:write", "vault:read", "vault:write", "admin:read"],
        createdAt: "2024-05-22T11:00:00.000Z",
        lastUsedAt: "2025-01-19T03:41:00.000Z",
        revokedAt: null,
      },
    ]
    for (const k of seedKeys) this.keys.set(k.id, k)
  }

  async verifyCredentials(email: string, password: string): Promise<UserRecord | null> {
    await this.ready
    const user = [...this.users.values()].find(
      (u) => u.email.toLowerCase() === email.toLowerCase(),
    )
    if (!user) {
      // Executa um hash "fantasma" para nivelar o tempo de resposta.
      await verifyPassword(password, "pbkdf2$100000$AAAAAAAAAAAAAAAAAAAAAA==$AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=")
      return null
    }
    const ok = await verifyPassword(password, user.passwordHash)
    return ok ? user : null
  }

  async getUserById(id: string): Promise<UserRecord | null> {
    await this.ready
    return this.users.get(id) ?? null
  }

  async getUserByEmail(email: string): Promise<UserRecord | null> {
    await this.ready
    return (
      [...this.users.values()].find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null
    )
  }

  async listApiKeys(userId: string): Promise<ApiKeyRecord[]> {
    await this.ready
    return [...this.keys.values()]
      .filter((k) => k.userId === userId)
      .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
  }

  async createApiKey(
    userId: string,
    name: string,
    scopes: string[],
  ): Promise<{ record: ApiKeyRecord; secret: string }> {
    await this.ready
    const isLive = process.env.NODE_ENV === "production"
    const env = isLive ? "live" : "test"
    const secretBody = Array.from(crypto.getRandomValues(new Uint8Array(18)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
    const prefix = `xz_${env}_${secretBody.slice(0, 4)}`
    const secret = `${prefix}${secretBody.slice(4)}`
    const record: ApiKeyRecord = {
      id: id("key_"),
      userId,
      name,
      prefix,
      last4: secretBody.slice(-4),
      scopes,
      createdAt: new Date().toISOString(),
      lastUsedAt: null,
      revokedAt: null,
    }
    this.keys.set(record.id, record)
    return { record, secret }
  }

  async revokeApiKey(userId: string, keyId: string): Promise<boolean> {
    await this.ready
    const key = this.keys.get(keyId)
    if (!key || key.userId !== userId || key.revokedAt) return false
    key.revokedAt = new Date().toISOString()
    this.keys.set(keyId, key)
    return true
  }
}

/**
 * Singleton do provider. Preservado entre hot-reloads via globalThis para
 * não perder o estado semeado a cada recompilação em dev.
 */
const globalForAuth = globalThis as unknown as { __xzarkAuthProvider?: AuthProvider }

export function getAuthProvider(): AuthProvider {
  if (!globalForAuth.__xzarkAuthProvider) {
    globalForAuth.__xzarkAuthProvider = new InMemoryAuthProvider()
  }
  return globalForAuth.__xzarkAuthProvider
}
