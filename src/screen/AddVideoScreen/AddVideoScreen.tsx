'use client'

import { useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import parseYouTube from '@/shared/libs'
import styles from './AddVideoScreen.module.css'

const schema = z.object({
  videoUrl: z.string().min(1, { message: 'The field must not be empty.' }),
})

type Inputs = {
  videoUrl: string
}

const AddVideoScreen = () => {
  const [videoId, setVideoId] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: Inputs) => {

    const url = data.videoUrl

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
  }

  const videoUrlErrorMessage = errors.videoUrl?.message
  const hasVideoUrlInputError = Boolean(videoUrlErrorMessage)

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <label>
          <input
            type="text"
            placeholder="Insert the link to the video"
            {...register(`videoUrl`)}
          />
          {hasVideoUrlInputError && (
            <p>{videoUrlErrorMessage}</p>
          )}
        </label>
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