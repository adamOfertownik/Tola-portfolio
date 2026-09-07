'use client'

import { useRouter } from 'next/navigation'

export function InquiriesLogout() {
  const router = useRouter()

  async function logout() {
    await fetch('/api/inquiries/session', { method: 'DELETE' })
    router.refresh()
  }

  return (
    <button
      type="button"
      onClick={() => void logout()}
      className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
    >
      Wyloguj
    </button>
  )
}
