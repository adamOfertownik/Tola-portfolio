import type { Metadata } from 'next'
import { FamilyHub } from '@/components/hub/family-hub'

export const metadata: Metadata = {
  title: 'Lieske — Tola & Milo',
  description: 'Hub rodzinny Toli i Milo Lieske. Dedykowane portfolio castingowe, reprezentowane wyłącznie przez Moon Kids.',
}

export default function HomePage() {
  return <FamilyHub />
}
