import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "ProfileEdit: ...",
}

type ProfileEditPageProps = {
  params: Promise<{ userId: string }>
}

export default async function ProfileEditPage({ params }: ProfileEditPageProps) {
  const data = await params
  const userId = data.userId

  return (
    <div>
      ProfileEditPage: {userId}
    </div>
  );
}
