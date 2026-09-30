import type { Metadata } from 'next'
import AddVideoScreen from '@/screen/AddVideoScreen/ui/AddVideoScreen'
import { getMeDataRequest } from '@/app/api/users/getMeDataRequest'

export const metadata: Metadata = {
  title: "Add video",
}

export default async function AddVideoPage() {
  try {
    const userInfo = await getMeDataRequest()
    const { user } = userInfo

    if (!user?.id) {
      throw new Error('No data about user')
    }

    const userId = user.id
    return <AddVideoScreen userId={userId} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong </div>
  }
}