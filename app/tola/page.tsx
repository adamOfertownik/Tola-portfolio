import type { Metadata } from 'next'
import { ProfilePage } from '@/components/profile/profile-page'
import { getProfile } from '@/lib/profiles'

const tolaMeta = getProfile('tola')

export const metadata: Metadata = {
  title: tolaMeta.metaTitle,
  description: tolaMeta.metaDescription,
}

export default function TolaPage() {
  return <ProfilePage profile={getProfile('tola')} />
}
