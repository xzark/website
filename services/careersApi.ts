export type CareersApplicationPayload = {
  jobId: string
  candidate: { name: string; email: string; phone: string; location: string }
  links: { linkedin: string; github: string; portfolio: string }
  experience: string
  education: string
  coverLetter: string
  privacyConsent: boolean
}

export type CareersApiError = { status: number; message: string }

const messages: Record<number, string> = {
  400: "Please review the information provided.",
  401: "We couldn't submit your application right now.",
  403: "We couldn't submit your application right now.",
  409: "This application may already exist. Please try again later.",
  413: "Your CV is too large.",
  415: "Only PDF files are accepted.",
  422: "Please check the highlighted fields.",
  429: "Too many attempts. Please try again later.",
  500: "We couldn't submit your application right now. Please try again later.",
  502: "We couldn't submit your application right now. Please try again later.",
  503: "We couldn't submit your application right now. Please try again later.",
}

export function getCareersApiUrl() {
  return process.env.NEXT_PUBLIC_CAREERS_API_URL?.replace(/\/$/, "") ?? ""
}

export async function submitApplication(
  payload: CareersApplicationPayload,
  cv: File,
  signal?: AbortSignal,
) {
  const baseUrl = getCareersApiUrl()
  if (!baseUrl) throw { status: 0, message: "Application submission is not connected yet." } satisfies CareersApiError

  const form = new FormData()
  form.append("jobId", payload.jobId)
  form.append("candidate", JSON.stringify(payload.candidate))
  form.append("links", JSON.stringify(payload.links))
  form.append("experience", payload.experience)
  form.append("education", payload.education)
  form.append("coverLetter", payload.coverLetter)
  form.append("privacyConsent", String(payload.privacyConsent))
  form.append("cv", cv, cv.name)

  const response = await fetch(`${baseUrl}/careers/applications`, { method: "POST", body: form, signal })
  if (response.ok) return
  const status = response.status
  throw { status, message: messages[status] ?? "We couldn't submit your application right now. Please try again later." } satisfies CareersApiError
}

export function getCareersApiError(error: unknown) {
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") return error.message
  return "We couldn't submit your application right now. Please try again later."
}

// A API externa deve repetir estas validações e implementar autenticação, rate limiting,
// CORS, CSRF quando aplicável, malware scanning, storage privado, controle de acesso,
// nomes aleatórios, logs de segurança e prepared statements no banco.
