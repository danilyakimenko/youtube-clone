'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { urlParser, isAllowedHost, YOUTUBE_DOMAINS } from '@/shared/libs'
import styles from './AddVideoScreen.module.scss'

const schema = z.object({
  videoUrl: z
    .string()
    .min(1, {message: 'The field must not be empty.'})
    .superRefine((url, ctx) => {
      let parsedURL: URL
      try {
        parsedURL = new URL(url)
      } catch {
        ctx.addIssue({
          code: "custom",
          message: 'The field must contain a link',
          input: url,
        })
        return
      }

      if (!isAllowedHost(parsedURL.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: "custom",
          message: 'The link should be on YouTube.',
          input: url,
        })
      }
    })
})

type Inputs = {
  videoUrl: string
}

const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState('')

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: Inputs) => {
    const url = new URL(data.videoUrl)
    const videoId = urlParser(url)

    if (!videoId) return

    setVideoId(videoId)
    await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({ videoId }),
    })
    const dataFromServer = await fetch('/api/videos', {
      method: 'GET',
    })
  }

  const videoUrlErrorMessage = errors.videoUrl?.message
  const hasVideoUrlInputError = Boolean(videoUrlErrorMessage)

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className={styles.label}>
          <input
            className={styles.input}
            type="text"
            placeholder="Insert the link to the video"
            {...register(`videoUrl`)}
          />
          {hasVideoUrlInputError && (
            <p className={styles.error}>{videoUrlErrorMessage}</p>
          )}
        </label>
        <button
          className={styles.button}
          type="submit"
        >
          Загрузить
        </button>
      </form>

      {videoId && (
        <iframe
          className={styles.iframe}
          width="500"
          height="300"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      )}
    </div>
  )
}

export default AddVideoScreen  