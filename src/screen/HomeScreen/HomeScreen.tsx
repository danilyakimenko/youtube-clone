'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AllVideosDto } from '@/shared/types/typesFromBackend'
import styles from './HomeScreen.module.scss'

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<AllVideosDto['data'] | null>(null)
  useEffect(() => {
    (async () => {
      try {
        const dataFromServer = await fetch('/api/videos', {
          method: 'GET',
        })
        const response = await dataFromServer.json() as AllVideosDto

        setData(response.data)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <div className={styles.container}>
      {data && data.length > 0 ?
        data.map(({ videoId, title, authorName, authorUrl }) => (
          <div
            className={styles.videoBlock}
            key={videoId}
          >
            <Image
              className={styles.videoImage}
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              width={480}
              height={360}
              alt="Video from YouTube"
            />
            <div className={styles.wrapper}>
              <Link
                className={styles.channelImageLink}
                href={`/profile/${authorUrl}`}
              >
                <Image
                  className={styles.channelImage}
                  src="/avatar.jpg"
                  width={32}
                  height={32}
                  alt="Channel avatar"
                />
              </Link>
              <div className={styles.videoInfo}>
                <p className={styles.videoName}>
                  {title}
                </p>
                <Link
                  className={styles.channelNameLink}
                  href={`/profile/${authorUrl}`}
                >
                  {authorName}
                </Link>
              </div>
            </div>
            <Link
              className={styles.link}
              href={`/video/${videoId}`}
              type="button"
            />
          </div>
        )) : (
          <div>No videos</div>
        )}
    </div>
  )
}

export default HomeScreen