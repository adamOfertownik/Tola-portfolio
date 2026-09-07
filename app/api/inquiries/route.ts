import { NextResponse } from 'next/server'
import { randomUUID } from 'node:crypto'
import { emailInquiry } from '@/lib/inquiries/email'
import { saveInquiry } from '@/lib/inquiries/store'
import {
  projectLabelFor,
  projectTypes,
  subjects,
  type InquirySubject,
  type ProjectType,
} from '@/lib/inquiries/types'

const subjectValues = subjects.map((item) => item.value)
const projectValues = projectTypes.map((item) => item.value)

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

function readProjects(body: Record<string, unknown>): ProjectType[] {
  const raw = body.projects ?? body.project
  const list = Array.isArray(raw) ? raw.map(String) : String(raw ?? '').split(',')
  return list.filter((item): item is ProjectType => projectValues.includes(item as ProjectType))
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
    const subject = String(body.subject ?? body.model ?? '') as InquirySubject
    const projects = readProjects(body)

    if (name.length < 2 || name.length > 120) {
      return NextResponse.json({ ok: false, error: 'Podaj imię i nazwisko.' }, { status: 400 })
    }
    if (!isEmail(email) || email.length > 160) {
      return NextResponse.json({ ok: false, error: 'Podaj poprawny adres e-mail.' }, { status: 400 })
    }
    if (!subjectValues.includes(subject)) {
      return NextResponse.json({ ok: false, error: 'Wybierz, kogo dotyczy zapytanie.' }, { status: 400 })
    }
    if (projects.length === 0) {
      return NextResponse.json({ ok: false, error: 'Wybierz rodzaj projektu. Można zaznaczyć oba.' }, { status: 400 })
    }
    if (message.length > 4000) {
      return NextResponse.json({ ok: false, error: 'Wiadomość jest za długa.' }, { status: 400 })
    }

    const inquiry = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      subject,
      name,
      company,
      email,
      phone,
      projects,
      projectLabel: projectLabelFor(projects),
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
