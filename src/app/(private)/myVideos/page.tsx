import type { Metadata } from 'next'
import { MyVideosScreen } from '@/screen/MyVideosScreen'
import { getVideosDataRequest } from '@/app/api/videos/getVideosDataRequest'
import { getMeDataRequest } from '@/app/api/users/getMeDataRequest'

export const metadata: Metadata = {
  title: "My videos",
}

export default async function MyVideosPage() {
  try {
    const userInfo = await getMeDataRequest()
    const { user } = userInfo

    if (!user?.id) {
      throw new Error('No data about user')
    }
    const userId = user.id
    const response = await getVideosDataRequest({ userIdParam: userId })

    if (!response.data) {
      throw new Error('No data about video')
    }
    return <MyVideosScreen data={response.data} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong </div>
  }
}
