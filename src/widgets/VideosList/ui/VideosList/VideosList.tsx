import Image from 'next/image'
import Link from 'next/link'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import styles from './VideosList.module.scss'

type VideosListProps = {
  data: GetAllVideosDto['data']
}

export const VideosList = ({data}: VideosListProps) => {
  if (data?.length <= 0) {
    return <div>No videos</div>
  }

  return (
    <div className={styles.videoGrid}>
      {data.map(({videoId, title, authorName, authorUrl}) => (
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
            unoptimized
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
      ))}
    </div>
  )
}