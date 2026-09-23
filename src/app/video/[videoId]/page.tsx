import type { Metadata } from 'next'
import VideoScreen from '@/screen/VideoScreen'

export const metadata: Metadata = {
  title: "Video: ...",
};

type VideoPageProps = {
  params: Promise<{ videoId: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params
  const videoId = data.videoId

  return (
    <VideoScreen
      videoId={videoId}
    />
  );
}
