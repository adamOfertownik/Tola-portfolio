import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile/profile-page'
import { tola } from '@/lib/profiles'

export const metadata: Metadata = {
  title: tola.metaTitle,
  description: tola.metaDescription,
}

export default function TolaPage() {
  return <ProfilePage profile={tola} />
}
