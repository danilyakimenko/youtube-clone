import type { Metadata } from 'next'
import { MyVideosScreen } from '@/screen/MyVideosScreen'
import { getVideosDataRequest } from '@/app/api/videos/getVideosDataRequest'

export const metadata: Metadata = {
  title: "My videos",
}

export default async function MyVideosPage() {
  const userId = '12345'

  try {
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
