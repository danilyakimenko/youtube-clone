import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { urlParser } from '@/shared/libs'
import { addOneVideoRequest } from '@/app/api/videos/addOneVideoRequest'
import { schema } from '../constants/addVideoSchema'


type useAddVideoFormProps = {
  userId: string
}

type Inputs = {
  videoUrl: string
  videoCategory: string
}

export const useAddVideoForm = ({ userId }: useAddVideoFormProps) => {
  const [videoId, setVideoId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  })

  const onSubmitHandler = async (data: Inputs) => {
    setIsLoading(true)
    const url = new URL(data.videoUrl)
    const videoId = urlParser(url)

    if (!videoId) return

    setVideoId(videoId)
    await addOneVideoRequest({ userId, videoId, categoryId: data.videoCategory })
    reset()
    setIsLoading(false)
  }

  return {
    isLoading,
    register,
    videoId,
    errors,
    onSubmit: handleSubmit(onSubmitHandler),
  }
}
