'use client'

import { useState } from 'react'
import parseYouTube from '@/shared/libs'
import styles from './AddVideoScreen.module.css'

const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState('')

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          const anyEvent = event as any
          const url = anyEvent.target.elements[0].value

          if (!url) return

          let finalUrl: URL | null = null

          try {
            finalUrl = new URL(url)
          } catch (error) {
            console.error('error', error)
          }

          if (!finalUrl) return

          const videoId = parseYouTube(finalUrl)

          if (!videoId) return

          setVideoId(videoId)
        }}
      >
        <input
          type="text"
          placeholder="Insert the link to the video"
        />
        <button
          type="submit"
        >
          Загрузить
        </button>
      </form>

      {videoId && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}
    </div>
  )
}

export default AddVideoScreen  