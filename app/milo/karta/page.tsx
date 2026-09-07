import type { Metadata } from 'next'
import { CompCard } from '@/components/profile/comp-card'
import { milo } from '@/lib/profiles'

export const metadata: Metadata = {
  title: 'Milo — Karta castingowa',
  description: 'Comp card Milo Lieske: zdjęcia, wymiary i dane bookera Moon Kids.',
}

export default function MiloCompCardPage() {
  return <CompCard profile={milo} />
}
