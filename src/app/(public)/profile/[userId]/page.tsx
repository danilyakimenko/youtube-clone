import type { Metadata } from 'next'
import { ProfileScreen } from '@/screen/ProfileScreen'

export const metadata: Metadata = {
  title: "Profile: ...",
}

type ProfilePageProps = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const data = await params
  const userId = data.userId

  return <ProfileScreen userId={userId} />
}
