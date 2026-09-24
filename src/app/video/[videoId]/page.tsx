import type { Metadata } from 'next'
import VideoScreen from '@/screen/VideoScreen'
import { GetOneVideoDto } from '@/shared/types/typesFromBackend'

export const metadata: Metadata = {
  title: "Video: ...",
}

type VideoPageProps = {
  params: Promise<{ videoId: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params
  const videoId = data.videoId

  try {
    const dataFromServer = await fetch(`http://localhost:3000/api/videos?videoId=${videoId}`)
    const response = await dataFromServer.json() as GetOneVideoDto

    if (!response.data) {
      throw new Error('No data about video')
    }

    return <VideoScreen data={response.data} />
  }
  catch (error) {
    console.error(error)
    return <div>Something went wrong </div>
  }
}