'use client'

import Link from 'next/link'
import Image from 'next/image'
import { VideoDto } from '@/shared/types/typesFromBackend'
import styles from './VideoScreen.module.scss'

type VideoScreenProps = {
  data: VideoDto
}

const VideoScreen = ({ data }: VideoScreenProps) => {
  return (
    <div className={styles.container}>
      <iframe
        className={styles.iframe}
        src={`https://www.youtube.com/embed/${data.videoId}?autoplay=1`}
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
          {data.title}
        </p>

        <div className={styles.videoInfo}>
          <Link
            className={styles.channelImageLink}
            href={`/profile/${data.authorUrl}`}
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
            href={`/profile/${data.authorUrl}`}
          >
            {data.authorName}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default VideoScreen