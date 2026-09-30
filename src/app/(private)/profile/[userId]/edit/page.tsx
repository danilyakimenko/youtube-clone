import type { Metadata } from 'next'
import { EditProfileScreen } from '@/screen/EditProfileScreen'
import { getMeDataRequest } from '@/app/api/users/getMeDataRequest'

export const metadata: Metadata = {
  title: "ProfileEdit: ...",
}

export default async function ProfileEditPage() {
  try {
    const userInfo = await getMeDataRequest()
    const { user } = userInfo

    if (!user?.id) {
      throw new Error('No data about user')
    }
    return <EditProfileScreen user={user} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong...</div>
  }
}
