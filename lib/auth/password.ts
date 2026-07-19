/**
 * Hashing de senha — PBKDF2 via Web Crypto (SubtleCrypto).
 *
 * Escolhemos PBKDF2 por ser nativo do runtime (Edge + Node), sem dependências
 * binárias como bcrypt. Formato armazenado:
 *   `pbkdf2$<iterations>$<saltBase64>$<hashBase64>`
 *
 * Ao migrar para o backend Go, a verificação passa a ocorrer no serviço xAuth
 * (argon2id) — este módulo permanece apenas para o provider auto-contido.
 */

const ITERATIONS = 100_000
const KEY_LEN = 32 // bytes
const DIGEST = "SHA-256"

function toBase64(bytes: Uint8Array): string {
  let bin = ""
  for (const b of bytes) bin += String.fromCharCode(b)
  return btoa(bin)
}

function fromBase64(b64: string): Uint8Array {
  const bin = atob(b64)
  const bytes = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i)
  return bytes
}

async function derive(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"],
  )
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations, hash: DIGEST },
    keyMaterial,
    KEY_LEN * 8,
  )
  return new Uint8Array(bits)
}

/** Gera um hash PBKDF2 serializável a partir de uma senha em texto puro. */
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const hash = await derive(password, salt, ITERATIONS)
  return `pbkdf2$${ITERATIONS}$${toBase64(salt)}$${toBase64(hash)}`
}

/** Comparação em tempo constante para evitar timing attacks. */
function timingSafeEqual(a: Uint8Array, b: Uint8Array): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/** Verifica uma senha contra um hash previamente serializado. */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$")
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false
  const iterations = Number.parseInt(parts[1], 10)
  if (!Number.isFinite(iterations) || iterations <= 0) return false
  const salt = fromBase64(parts[2])
  const expected = fromBase64(parts[3])
  const actual = await derive(password, salt, iterations)
  return timingSafeEqual(actual, expected)
}
