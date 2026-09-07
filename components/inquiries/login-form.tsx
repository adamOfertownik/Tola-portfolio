'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export function InquiriesLogin() {
  const router = useRouter()
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSending(true)
    setError('')
    const password = String(new FormData(event.currentTarget).get('password') ?? '')
    const response = await fetch('/api/inquiries/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (!response.ok) {
      setSending(false)
      setError('Nieprawidłowe hasło.')
      return
    }
    router.refresh()
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-primary">Skrzynka zapytań</p>
      <h1 className="font-serif text-5xl tracking-[-0.06em]">Zapytania</h1>
      <p className="mt-4 text-sm text-muted-foreground">Tylko dla opiekunów Toli i Milo. Tu widać kto napisał, niezależnie od Moon Kids.</p>
      <form onSubmit={onSubmit} className="mt-10 grid gap-4">
        <label className="grid gap-2 text-sm">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Hasło</span>
          <input
            required
            type="password"
            name="password"
            autoComplete="current-password"
            className="border border-border bg-background px-4 py-3 outline-none focus:border-primary"
          />
        </label>
        <button
          type="submit"
          disabled={sending}
          className="w-fit bg-foreground px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-background disabled:opacity-50"
        >
          {sending ? 'Otwieranie…' : 'Otwórz skrzynkę'}
        </button>
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
      </form>
    </main>
  )
}
