import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile/profile-page'
import { getProfile } from '@/lib/profiles'

const miloMeta = getProfile('milo')

export const metadata: Metadata = {
  title: miloMeta.metaTitle,
  description: miloMeta.metaDescription,
}

export default function MiloPage() {
  return <ProfilePage profile={getProfile('milo')} />
}
