import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Profile: ...",
}

type ProfilePageProps = {
  params: Promise<{ profileId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const data = await params
  const profileId = data.profileId

  return (
    <div>
      ProfilePage: {profileId}
    </div>
  );
}
