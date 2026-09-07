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
  portfolio: string
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
  if (values.email.trim()) validateEmail(values.email, issues)
  validateUrl(values.linkedin, "linkedin", "LinkedIn", issues)
  validateUrl(values.portfolio, "portfolio", "Portfólio", issues)
  if (!values.consent) issues.push({ field: "consent", message: "Aceite o consentimento de dados." })
  return issues
}

export function validatePdf(file: File | null): string | null {
  if (!file) return "Selecione seu currículo em PDF."
  if (file.type !== "application/pdf") return "O currículo precisa ser um arquivo PDF."
  if (file.size > 5 * 1024 * 1024) return "O currículo deve ter no máximo 5 MB."
  return null
}
