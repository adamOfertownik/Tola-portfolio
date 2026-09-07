import { Resend } from 'resend'
import { agency } from '@/lib/agency'
import { modelLabel, type Inquiry } from '@/lib/inquiries/types'

function notifyEmail() {
  return process.env.INQUIRY_NOTIFY_EMAIL?.trim() || ''
}

function fromAddress() {
  return process.env.INQUIRY_FROM_EMAIL?.trim() || 'Lieske <beth.t@example.com>'
}

export async function emailInquiry(inquiry: Inquiry) {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) {
    return { sent: false as const, reason: 'missing-key' }
  }

  const copyTo = notifyEmail()
  const resend = new Resend(apiKey)
  const subject = `Zapytanie komercyjne — ${modelLabel(inquiry.model)} (${inquiry.projectLabel})`
  const text = [
    `Nowe zapytanie z lieske.art / portfolio.`,
    '',
    `Model: ${modelLabel(inquiry.model)}`,
    `Imię i nazwisko: ${inquiry.name}`,
    `Firma / produkcja: ${inquiry.company || '—'}`,
    `E-mail: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || '—'}`,
    `Rodzaj projektu: ${inquiry.projectLabel}`,
    '',
    inquiry.message || '(bez dodatkowej wiadomości)',
    '',
    `Odpowiedz bezpośrednio na ${inquiry.email}.`,
  ].join('\n')

  const { error } = await resend.emails.send({
    from: fromAddress(),
    to: [agency.email],
    ...(copyTo ? { bcc: [copyTo] } : {}),
    replyTo: inquiry.email,
    subject,
    text,
  })

  if (error) {
    console.error('inquiry email failed')
    return { sent: false as const, reason: 'provider' }
  }

  return { sent: true as const }
}
