/**
 * Mock data para o painel administrativo xZark.
 * Em produção, substituir por chamadas reais à API.
 */

export const trafficSeries = [
  { time: "00:00", requests: 8400, blocked: 120 },
  { time: "02:00", requests: 6200, blocked: 90 },
  { time: "04:00", requests: 5400, blocked: 75 },
  { time: "06:00", requests: 7100, blocked: 110 },
  { time: "08:00", requests: 12800, blocked: 280 },
  { time: "10:00", requests: 18400, blocked: 420 },
  { time: "12:00", requests: 21200, blocked: 510 },
  { time: "14:00", requests: 23800, blocked: 780 },
  { time: "16:00", requests: 22100, blocked: 640 },
  { time: "18:00", requests: 18600, blocked: 380 },
  { time: "20:00", requests: 14200, blocked: 220 },
  { time: "22:00", requests: 10400, blocked: 160 },
]

export const threatTypes = [
  { name: "DDoS L7", value: 38, color: "var(--primary)" },
  { name: "SQL Injection", value: 22, color: "var(--accent)" },
  { name: "Bot Traffic", value: 18, color: "var(--warning)" },
  { name: "XSS", value: 12, color: "var(--success)" },
  { name: "Outros", value: 10, color: "var(--muted-foreground)" },
]

export interface ThreatEvent {
  id: string
  timestamp: string
  type: string
  severity: "critical" | "high" | "medium" | "low"
  source: string
  target: string
  action: "blocked" | "mitigated" | "alerted"
  country: string
}

export const recentThreats: ThreatEvent[] = [
  {
    id: "evt_1a8f2",
    timestamp: "12:34:18",
    type: "DDoS Volumetric",
    severity: "critical",
    source: "185.220.101.42",
    target: "api.xzark.co",
    action: "blocked",
    country: "RU",
  },
  {
    id: "evt_1a8f1",
    timestamp: "12:33:51",
    type: "SQL Injection",
    severity: "high",
    source: "92.118.160.13",
    target: "/v1/auth",
    action: "blocked",
    country: "NL",
  },
  {
    id: "evt_1a8f0",
    timestamp: "12:32:09",
    type: "Credential Stuffing",
    severity: "high",
    source: "45.155.205.230",
    target: "/login",
    action: "mitigated",
    country: "DE",
  },
  {
    id: "evt_1a8ef",
    timestamp: "12:31:44",
    type: "Bot Scraping",
    severity: "medium",
    source: "104.244.74.211",
    target: "/api/products",
    action: "alerted",
    country: "US",
  },
  {
    id: "evt_1a8ee",
    timestamp: "12:30:12",
    type: "XSS Attempt",
    severity: "medium",
    source: "200.142.91.7",
    target: "/contact",
    action: "blocked",
    country: "BR",
  },
  {
    id: "evt_1a8ed",
    timestamp: "12:28:55",
    type: "Path Traversal",
    severity: "low",
    source: "78.46.218.99",
    target: "/admin",
    action: "blocked",
    country: "CN",
  },
  {
    id: "evt_1a8ec",
    timestamp: "12:27:30",
    type: "Brute Force SSH",
    severity: "high",
    source: "176.65.137.84",
    target: "edge-01",
    action: "blocked",
    country: "RU",
  },
]

export interface UserRow {
  id: string
  name: string
  email: string
  role: "Admin" | "Operator" | "Auditor" | "Developer"
  status: "active" | "suspended" | "pending"
  mfa: boolean
  lastSeen: string
}

export const users: UserRow[] = [
  {
    id: "usr_001",
    name: "Marina Costa",
    email: "marina@xzark.co",
    role: "Admin",
    status: "active",
    mfa: true,
    lastSeen: "2 min",
  },
  {
    id: "usr_002",
    name: "Rafael Andrade",
    email: "rafael@xzark.co",
    role: "Operator",
    status: "active",
    mfa: true,
    lastSeen: "12 min",
  },
  {
    id: "usr_003",
    name: "Júlia Tanaka",
    email: "julia@xzark.co",
    role: "Auditor",
    status: "active",
    mfa: true,
    lastSeen: "1h",
  },
  {
    id: "usr_004",
    name: "Bruno Hoffmann",
    email: "bruno@xzark.co",
    role: "Developer",
    status: "active",
    mfa: true,
    lastSeen: "3h",
  },
  {
    id: "usr_005",
    name: "Camila Reis",
    email: "camila@xzark.co",
    role: "Operator",
    status: "suspended",
    mfa: false,
    lastSeen: "2d",
  },
  {
    id: "usr_006",
    name: "Diego Oliveira",
    email: "diego@xzark.co",
    role: "Developer",
    status: "pending",
    mfa: false,
    lastSeen: "—",
  },
]

export const regions = [
  { code: "BR-SP1", city: "São Paulo", load: 62, status: "healthy" },
  { code: "BR-BA1", city: "Salvador", load: 58, status: "healthy" },
  { code: "US-VA1", city: "Ashburn", load: 78, status: "healthy" },
  { code: "EU-FR1", city: "Frankfurt", load: 54, status: "healthy" },
  { code: "AP-SG1", city: "Singapore", load: 81, status: "degraded" },
  { code: "EU-DUB1", city: "Dublin", load: 44, status: "healthy" },
  { code: "AP-TKY1", city: "Tokyo", load: 67, status: "healthy" },
] as const
