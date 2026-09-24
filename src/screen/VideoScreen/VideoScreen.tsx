'use client'

import styles from './VideoScreen.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { GetOneVideoDto } from '@/shared/types/typesFromBackend'

type VideoScreenProps = {
  videoId: string
}

const VideoScreen = (props: VideoScreenProps) => {
  const {
    videoId,
  } = props

  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<GetOneVideoDto['data'] | null>(null)

  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await fetch(`/api/videos?videoId=${videoId}`)
        const response = await dataFromServer.json() as GetOneVideoDto

        if (response.data) {
          setData(response.data)
        }

      } finally {
        setIsLoading(false)
      }
    })()
  }, [videoId])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!data) return null


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