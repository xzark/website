export type FormIssue = {
  field: string
  message: string
}

export type ContactValues = {
  name: string
  email: string
  company: string
  topic: string
  message: string
  consent: boolean
}

export type ApplicationValues = {
  name: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
  portfolio: string
  experience: string
  education: string
  availability: string
  message: string
  consent: boolean
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const urlPattern = /^https?:\/\/[^\s]+$/i

function required(value: string, label: string, field: string, issues: FormIssue[]) {
  if (!value.trim()) issues.push({ field, message: `${label} é obrigatório.` })
}

function validateEmail(value: string, issues: FormIssue[]) {
  if (!emailPattern.test(value.trim())) {
    issues.push({ field: "email", message: "Informe um e-mail válido." })
  }
}

function validateUrl(value: string, field: string, label: string, issues: FormIssue[]) {
  if (value.trim() && !urlPattern.test(value.trim())) {
    issues.push({ field, message: `${label} deve começar com http:// ou https://.` })
  }
}

export function validateContact(values: ContactValues): FormIssue[] {
  const issues: FormIssue[] = []
  required(values.name, "Nome", "name", issues)
  required(values.email, "E-mail", "email", issues)
  required(values.company, "Empresa", "company", issues)
  required(values.message, "Mensagem", "message", issues)
  if (values.email.trim()) validateEmail(values.email, issues)
  if (!values.consent) issues.push({ field: "consent", message: "Aceite a política de privacidade." })
  return issues
}

export function validateApplication(values: ApplicationValues): FormIssue[] {
  const issues: FormIssue[] = []
  required(values.name, "Nome", "name", issues)
  required(values.email, "E-mail", "email", issues)
  required(values.location, "Localização", "location", issues)
  required(values.availability, "Disponibilidade", "availability", issues)
  required(values.experience, "Experiência", "experience", issues)
  if (values.email.trim()) validateEmail(values.email, issues)
  validateUrl(values.linkedin, "linkedin", "LinkedIn", issues)
  validateUrl(values.github, "github", "GitHub", issues)
  validateUrl(values.portfolio, "portfolio", "Portfólio", issues)
  if (!values.consent) issues.push({ field: "consent", message: "Aceite o consentimento de dados." })
  return issues
}

export const MAX_CV_SIZE = 10 * 1024 * 1024

export function validatePdfMetadata(file: File | null): string | null {
  if (!file) return "Upload your CV"
  const isPdfName = file.name.toLowerCase().endsWith(".pdf")
  if (!isPdfName || file.type !== "application/pdf") return "Only PDF files are accepted."
  if (file.size > MAX_CV_SIZE) return "Your CV exceeds the 10 MB limit. Please upload a smaller PDF."
  return null
}

export async function validatePdf(file: File | null): Promise<string | null> {
  const metadataIssue = validatePdfMetadata(file)
  if (metadataIssue || !file) return metadataIssue
  const header = await file.slice(0, 5).arrayBuffer()
  const signature = new TextDecoder().decode(header)
  return signature === "%PDF-" ? null : "Only PDF files are accepted."
}
