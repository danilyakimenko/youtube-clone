'use client'

type VideoScreenProps = {
  videoId: string
}

const VideoScreen = (props: VideoScreenProps) => {
  const {
    videoId,
  } = props

  return (
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      width={1400}
      height={800}
      title="YouTube video player"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    ></iframe>
  )
}

export default VideoScreen