import type { Metadata } from 'next'
import { CompCard } from '@/components/profile/comp-card'
import { tola } from '@/lib/profiles'

export const metadata: Metadata = {
  title: 'Tola — Karta castingowa',
  description: 'Comp card Toli Lieske: zdjęcia, wymiary i dane bookera Moon Kids.',
}

export default function TolaCompCardPage() {
  return <CompCard profile={tola} />
}
