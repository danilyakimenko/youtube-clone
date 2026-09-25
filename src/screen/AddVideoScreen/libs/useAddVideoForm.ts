import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { isAllowedHost, urlParser, YOUTUBE_DOMAINS } from '@/shared/libs'

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
    }),
  videoCategory: z
    .string()
})

type Inputs = {
  videoUrl: string
  videoCategory: string
}

export const useAddVideoForm = () => {
  const [videoId, setVideoId] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmitHandler = async (data: Inputs) => {
    const url = new URL(data.videoUrl)
    const videoId = urlParser(url)

    if (!videoId) return

    setVideoId(videoId)

    await fetch('/api/videos', {
      method: 'POST',
      body: JSON.stringify({ userId: '12345', videoId, categoryId: data.videoCategory }),
    })
    reset()
  }

  return {
    register,
    videoId,
    errors,
    onSubmit: handleSubmit(onSubmitHandler),
  }
}
