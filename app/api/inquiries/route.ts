import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { emailInquiry } from '@/lib/inquiries/email'
import { saveInquiry } from '@/lib/inquiries/store'
import { projectLabelFor, projectTypes, type InquiryModel, type ProjectType } from '@/lib/inquiries/types'

const models: InquiryModel[] = ['tola', 'milo', 'family']
const projects = projectTypes.map((item) => item.value)

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>
    if (String(body.website ?? '').trim()) {
      return NextResponse.json({ ok: true })
    }

    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim().toLowerCase()
    const company = String(body.company ?? '').trim()
    const phone = String(body.phone ?? '').trim()
    const message = String(body.message ?? '').trim()
    const model = String(body.model ?? '') as InquiryModel
    const project = String(body.project ?? '') as ProjectType

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ ok: false, error: 'Podaj imię i nazwisko.' }, { status: 400 })
    }
    if (!isEmail(email) || email.length > 160) {
      return NextResponse.json({ ok: false, error: 'Podaj poprawny adres e-mail.' }, { status: 400 })
    }
    if (!models.includes(model)) {
      return NextResponse.json({ ok: false, error: 'Wybierz profil.' }, { status: 400 })
    }
    if (!projects.includes(project)) {
      return NextResponse.json({ ok: false, error: 'Wybierz rodzaj projektu.' }, { status: 400 })
    }
    if (message.length > 4000) {
      return NextResponse.json({ ok: false, error: 'Wiadomość jest za długa.' }, { status: 400 })
    }

    const inquiry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      model,
      name,
      company,
      email,
      phone,
      project,
      projectLabel: projectLabelFor(project, model),
      message,
    }

    await saveInquiry(inquiry)
    const emailed = await emailInquiry(inquiry)

    return NextResponse.json({ ok: true, emailed: emailed.sent })
  } catch (error) {
    console.error('inquiry submit failed')
    return NextResponse.json({ ok: false, error: 'Nie udało się wysłać zapytania. Spróbuj ponownie.' }, { status: 500 })
  }
}
