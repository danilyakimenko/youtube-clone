import type { Metadata } from 'next'
import { ProfileScreen } from '@/screen/ProfileScreen'
import { getUserDataRequest } from '@/app/api/users/getUserDataRequest'
import { getUserInfoFromAuthToken } from '@/app/api/_libs/getUserInfoFromAuthToken'

export const metadata: Metadata = {
  title: "Profile: ...",
}

type ProfilePageProps = {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  try {
    const userFromAuthToken = await getUserInfoFromAuthToken()
    const { userId } = await params
    const userInfo = await getUserDataRequest({ userId })
    const { user } = userInfo

    if (!user?.id) {
      throw new Error('No data about user')
    }
    const isAuthorized = userFromAuthToken?.id === userId

    return <ProfileScreen user={user} isAuthorized={isAuthorized} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong...</div>
  }
}
