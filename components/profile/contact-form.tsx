'use client'

import { FormEvent, useState } from 'react'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'
import { projectTypes, type InquiryModel } from '@/lib/inquiries/types'

type ContactFormProps = {
  profile?: Profile
  tone?: 'on-dark' | 'on-light'
}

export function ContactForm({ profile, tone = 'on-dark' }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [error, setError] = useState('')
  const model: InquiryModel = profile?.slug ?? 'family'
  const dark = tone === 'on-dark'
  const fieldClass = dark
    ? 'border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary'
    : 'border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-primary'
  const labelClass = dark
    ? 'text-[10px] uppercase tracking-[0.2em] text-background/50'
    : 'text-[10px] uppercase tracking-[0.2em] text-muted-foreground'
  const radioClass = dark ? 'text-background/80' : 'text-foreground/80'

  const duoLabel =
    model === 'tola' ? 'Projekt w duecie z bratem' : model === 'milo' ? 'Projekt w duecie z siostrą' : 'Projekt w duecie Tola + Milo'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    const data = new FormData(event.currentTarget)
    const payload = {
      name: String(data.get('name') ?? ''),
      company: String(data.get('company') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      project: String(data.get('project') ?? ''),
      message: String(data.get('message') ?? ''),
      website: String(data.get('website') ?? ''),
      model: String(data.get('model') ?? model),
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
      event.currentTarget.reset()
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
      {profile ? <input type="hidden" name="model" value={model} /> : (
        <label className="grid gap-2">
          <span className={labelClass}>Dotyczy</span>
          <select name="model" defaultValue="family" className={fieldClass}>
            <option value="family">Tola i Milo / ogólne</option>
            <option value="tola">Tola</option>
            <option value="milo">Milo</option>
          </select>
        </label>
      )}
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
        <legend className={labelClass}>Rodzaj projektu</legend>
        {projectTypes.map((item) => (
          <label key={item.value} className={`flex items-center gap-3 ${radioClass}`}>
            <input type="radio" name="project" value={item.value} required className="accent-primary" />
            {item.value === 'duo' ? duoLabel : item.label}
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
