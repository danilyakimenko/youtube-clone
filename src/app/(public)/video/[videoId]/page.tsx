import type { Metadata } from 'next'
import VideoScreen from '@/screen/VideoScreen'
import { GetOneVideoDto } from '@/shared/types/typesFromBackend'

type VideoPageProps = {
  params: Promise<{ videoId: string }>
}

export async function generateMetadata(
  { params }: VideoPageProps,
): Promise<Metadata> {
  const data = await params
  const videoId = data.videoId
  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`)
    const response = await dataFromServer.json() as GetOneVideoDto

    if (!response.data) {
      throw new Error('No data about video')
    }

    return {
      title: `${response.data.title}`,
    }
  }
  catch (error) {
    console.error(error)
    return {
      title: 'Something went wrong'
    }
  }
}

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params
  const videoId = data.videoId

  try {
    const dataFromServer = await fetch(`${process.env.SERVER_API_URL}/api/videos?videoId=${videoId}`)
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