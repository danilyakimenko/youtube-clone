'use server'

import { videos } from '@/app/api/db'

type addOneVideoProps = {
  userId: string,
  videoId: string,
  categoryId: string
}

export const addOneVideo = async ({
  userId,
  videoId,
  categoryId,
}: addOneVideoProps) => {
  if (videos.has(videoId)) {
    return {
      ok: false,
      error: 'The video has already been added'
    }
  }
  videos.set(videoId, {
    id: videoId,
    userId,
    categoryId,
  })

  return { ok: true }
}