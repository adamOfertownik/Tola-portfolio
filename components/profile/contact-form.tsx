'use client'

import { FormEvent, useState } from 'react'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'
import { projectTypes, subjects } from '@/lib/inquiries/types'

type ContactFormProps = {
  profile?: Profile
  tone?: 'on-dark' | 'on-light'
}

export function ContactForm({ profile, tone = 'on-dark' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const dark = tone === 'on-dark'
  const fieldClass = dark
    ? 'border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary'
    : 'border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary'
  const labelClass = dark
    ? 'text-[10px] uppercase tracking-[0.2em] text-background/50'
    : 'text-[10px] uppercase tracking-[0.2em] text-muted-foreground'
  const optionClass = dark ? 'text-background/80' : 'text-foreground/80'
  const defaultSubject = profile?.slug === 'milo' ? 'milo' : profile?.slug === 'tola' ? 'tola' : undefined

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    setStatus('sending')
    setError('')
    const data = new FormData(form)
    const projects = data.getAll('projects').map(String)
    if (projects.length === 0) {
      setStatus('error')
      setError('Zaznacz rodzaj projektu. Można wybrać obie pozycje.')
      return
    }

    const payload = {
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      subject: String(data.get('subject') ?? ''),
      projects,
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
    }

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Nie udało się wysłać zapytania.')
      }
      setStatus('sent')
      form.reset()
    } catch (submitError) {
      setStatus('error')
      setError(submitError instanceof Error ? submitError.message : 'Nie udało się wysłać zapytania.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative mt-10 grid max-w-xl gap-4 text-sm">
      <div className="absolute -left-[10000px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="grid gap-2">
        <span className={labelClass}>Imię i nazwisko</span>
        <input required name="name" autoComplete="name" className={fieldClass} />
      </label>
      <label className="grid gap-2">
        <span className={labelClass}>Firma / produkcja</span>
        <input name="company" autoComplete="organization" className={fieldClass} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className={labelClass}>E-mail</span>
          <input required type="email" name="email" autoComplete="email" className={fieldClass} />
        </label>
        <label className="grid gap-2">
          <span className={labelClass}>Telefon</span>
          <input type="tel" name="phone" autoComplete="tel" className={fieldClass} />
        </label>
      </div>
      <fieldset className="grid gap-3">
        <legend className={labelClass}>Zapytanie dotyczy</legend>
        {subjects.map((item) => (
          <label key={item.value} className={`flex items-center gap-3 ${optionClass}`}>
            <input
              type="radio"
              name="subject"
              value={item.value}
              required
              defaultChecked={defaultSubject === item.value}
              className="accent-primary"
            />
            {item.label}
          </label>
        ))}
      </fieldset>
      <fieldset className="grid gap-3">
        <legend className={labelClass}>Rodzaj projektu</legend>
        <p className={`-mt-1 text-xs ${dark ? 'text-background/50' : 'text-muted-foreground'}`}>Można zaznaczyć obie pozycje.</p>
        {projectTypes.map((item) => (
          <label key={item.value} className={`flex items-center gap-3 ${optionClass}`}>
            <input type="checkbox" name="projects" value={item.value} className="accent-primary" />
            {item.label}
          </label>
        ))}
      </fieldset>
      <label className="grid gap-2">
        <span className={labelClass}>Wiadomość</span>
        <textarea name="message" rows={4} className={`resize-y ${fieldClass}`} />
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-2 w-fit bg-primary px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? 'Wysyłanie…' : profile?.bookLabel ?? 'Wyślij zapytanie'}
      </button>
      <p className={`text-xs ${dark ? 'text-background/55' : 'text-muted-foreground'}`}>
        Zapytanie idzie do bookera Moon Kids ({agency.email}). Kopia zostaje u nas, żebyśmy widzieli kto pisze.
      </p>
      {status === 'sent' ? (
        <p className={`text-sm ${dark ? 'text-primary' : 'text-foreground'}`}>
          Dziękujemy. Zapytanie zostało wysłane.
        </p>
      ) : null}
      {status === 'error' ? <p className="text-sm text-red-400">{error}</p> : null}
    </form>
  )
}
