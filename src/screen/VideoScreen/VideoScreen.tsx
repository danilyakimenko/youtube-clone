'use client'

import styles from './VideoScreen.module.scss'
import Link from 'next/link'
import Image from 'next/image'

type VideoScreenProps = {
  videoId: string
}

const VideoScreen = (props: VideoScreenProps) => {
  const {
    videoId,
  } = props

  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${videoId}`}
        width={1200}
        height={600}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      <div className={styles.wrapper}>
        <p className={styles.videoName}>
          Sonny Boy OST - Kodama's Theme
        </p>

        <div className={styles.videoInfo}>
          <Link
            className={styles.channelImageLink}
            href="/profile/123"
          >
            <Image
              className={styles.channelImage}
              src="/avatar.jpg"
              width={32}
              height={32}
              alt="Channel avatar"
            />
          </Link>
          <Link
            className={styles.channelNameLink}
            href="/profile/123"
          >
            Channel name
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoScreen