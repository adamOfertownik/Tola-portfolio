import { cookies } from 'next/headers'
import Link from 'next/link'
import { InquiriesLogin } from '@/components/inquiries/login-form'
import { InquiriesLogout } from '@/components/inquiries/logout-button'
import { agency } from '@/lib/agency'
import { inquiriesCookieName, isValidInquiriesSession } from '@/lib/inquiries/auth'
import { listInquiries } from '@/lib/inquiries/store'
import { modelLabel } from '@/lib/inquiries/types'

export const metadata = {
  title: 'Zapytania — Lieske',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pl-PL', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export default async function InquiriesPage() {
  const cookieStore = await cookies()
  const authed = isValidInquiriesSession(cookieStore.get(inquiriesCookieName())?.value)

  if (!authed) {
    return <InquiriesLogin />
  }

  const inquiries = await listInquiries()

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Link href="/" className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground">
              ← Lieske
            </Link>
            <h1 className="mt-6 font-serif text-5xl tracking-[-0.06em]">Zapytania</h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              Kopie zapytań z formularza. Moon Kids dostaje tę samą wiadomość na {agency.email}.
            </p>
          </div>
          <InquiriesLogout />
        </div>

        {inquiries.length === 0 ? (
          <p className="mt-16 text-sm text-muted-foreground">Jeszcze nie ma zapytań.</p>
        ) : (
          <ul className="mt-12 grid gap-6">
            {inquiries.map((inquiry) => (
              <li key={inquiry.id} className="border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{inquiry.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{inquiry.company || 'Bez firmy'}</p>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{formatDate(inquiry.createdAt)}</p>
                </div>
                <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">E-mail</dt>
                    <dd>
                      <a className="hover:text-primary" href={`mailto:${inquiry.email}`}>
                        {inquiry.email}
                      </a>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Telefon</dt>
                    <dd>
                      {inquiry.phone ? (
                        <a className="hover:text-primary" href={`tel:${inquiry.phone}`}>
                          {inquiry.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Model</dt>
                    <dd>{modelLabel(inquiry.model)}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Projekt</dt>
                    <dd>{inquiry.projectLabel}</dd>
                  </div>
                </dl>
                {inquiry.message ? <p className="mt-5 whitespace-pre-wrap text-sm leading-6">{inquiry.message}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
