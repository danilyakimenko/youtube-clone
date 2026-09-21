type VideoPageProps = {
  params: Promise<{ videoId: string }>
}

export default async function VideoPage({ params }: VideoPageProps) {
  const data = await params
  const videoId = data.videoId

  return (
    <div>
      VideoPage: {videoId}
    </div>
  );
}
