'use client'

import { FormEvent, useState } from 'react'
import { agency } from '@/lib/agency'
import type { Profile } from '@/lib/profiles'

const projectTypes = [
  { value: 'tvc', label: 'TVC / Reklama wideo' },
  { value: 'print', label: 'Sesja zdjęciowa / Print' },
  { value: 'duo', label: 'Projekt w duecie z rodzeństwem' },
] as const

type ContactFormProps = {
  profile: Profile
}

export function ContactForm({ profile }: ContactFormProps) {
  const [sent, setSent] = useState(false)

  const duoLabel =
    profile.slug === 'tola' ? 'Projekt w duecie z bratem' : 'Projekt w duecie z siostrą'

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const company = String(data.get('company') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const project = String(data.get('project') ?? '')
    const message = String(data.get('message') ?? '').trim()
    const projectLabel =
      project === 'duo' ? duoLabel : projectTypes.find((item) => item.value === project)?.label ?? project

    const subject = `Commercial inquiry — ${profile.name} Lieske (${projectLabel})`
    const body = [
      `Imię i nazwisko: ${name}`,
      `Firma / produkcja: ${company || '—'}`,
      `E-mail: ${email}`,
      `Telefon: ${phone || '—'}`,
      `Rodzaj projektu: ${projectLabel}`,
      `Model: ${profile.name} Lieske`,
      '',
      message,
    ].join('\n')

    window.location.href = `mailto:${agency.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <form onSubmit={onSubmit} className="mt-10 grid max-w-xl gap-4 text-sm">
      <label className="grid gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">Imię i nazwisko</span>
        <input
          required
          name="name"
          autoComplete="name"
          className="border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary"
        />
      </label>
      <label className="grid gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">Firma / produkcja</span>
        <input
          name="company"
          autoComplete="organization"
          className="border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary"
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">E-mail</span>
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            className="border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary"
          />
        </label>
        <label className="grid gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">Telefon</span>
          <input
            type="tel"
            name="phone"
            autoComplete="tel"
            className="border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary"
          />
        </label>
      </div>
      <fieldset className="grid gap-3">
        <legend className="text-[10px] uppercase tracking-[0.2em] text-background/50">Rodzaj projektu</legend>
        {projectTypes.map((item) => (
          <label key={item.value} className="flex items-center gap-3 text-background/80">
            <input type="radio" name="project" value={item.value} required className="accent-primary" />
            {item.value === 'duo' ? duoLabel : item.label}
          </label>
        ))}
      </fieldset>
      <label className="grid gap-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-background/50">Wiadomość</span>
        <textarea
          name="message"
          rows={4}
          className="resize-y border border-background/20 bg-transparent px-4 py-3 text-background outline-none focus:border-primary"
        />
      </label>
      <button
        type="submit"
        className="mt-2 w-fit bg-primary px-6 py-3 text-[10px] uppercase tracking-[0.22em] text-primary-foreground transition-opacity hover:opacity-90"
      >
        {profile.bookLabel}
      </button>
      {sent ? (
        <p className="text-xs text-background/60">
          Otworzy się wiadomość do bookera Moon Kids. Jeśli klient poczty nie wystartował, napisz bezpośrednio na{' '}
          <a className="text-primary underline-offset-4 hover:underline" href={`mailto:${agency.email}`}>
            {agency.email}
          </a>
          .
        </p>
      ) : null}
    </form>
  )
}
