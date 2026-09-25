import type { Metadata } from 'next'
import { MyVideosScreen } from '@/screen/MyVideosScreen'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'

export const metadata: Metadata = {
  title: "My videos",
}

export default async function MyVideosPage() {
  const userId = '12345'

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?userId=${userId}`)
    const response = await dataFromServer.json() as GetAllVideosDto

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
