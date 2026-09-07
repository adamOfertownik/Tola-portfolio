import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile/profile-page'
import { milo } from '@/lib/profiles'

export const metadata: Metadata = {
  title: milo.metaTitle,
  description: milo.metaDescription,
}

export default function MiloPage() {
  return <ProfilePage profile={milo} />
}
