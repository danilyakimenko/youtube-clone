import type { Metadata } from 'next'
import { ProfileScreen } from '@/screen/ProfileScreen'
import { getUsersDataRequest } from '@/app/api/users/getUsersDataRequest'

export const metadata: Metadata = {
  title: "Profile: ...",
}

type ProfilePageProps = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  try {
    const userInfo = await getUsersDataRequest()
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
