import type { Metadata } from 'next'
import { ProfileScreen } from '@/screen/ProfileScreen'
import { getUserDataRequest } from '@/app/api/users/getUserDataRequest'

export const metadata: Metadata = {
  title: "Profile: ...",
}

type ProfilePageProps = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  try {
    const userInfo = await getUserDataRequest({ nickname: '1234' })
    const { user } = userInfo

    if (!user?.id) {
      throw new Error('No data about user')
    }

    const userId = user.id
    console.log('profilepageuserlog', user)
    return <ProfileScreen userId={userId} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong...</div>
  }
}
