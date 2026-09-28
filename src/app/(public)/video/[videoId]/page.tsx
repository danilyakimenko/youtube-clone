import type { Metadata } from 'next'
import VideoScreen from '@/screen/VideoScreen'
import { getOneVideoRequest } from '@/app/api/videos/getOneVideoRequest'

type VideoPageProps = {
  params: Promise<{ videoId: string }>
}

export async function generateMetadata(
  { params }: VideoPageProps,
): Promise<Metadata> {
  const data = await params
  const videoId = data.videoId
  try {
    const response = await getOneVideoRequest({ videoId })

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
    const response = await getOneVideoRequest({ videoId })

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