'use server'

import { getVideos, saveVideos } from '@/app/api/blobDB'

type addOneVideoProps = {
  userId: string,
  videoId: string,
  categoryId: string
}

export const addOneVideoRequest = async ({
  userId,
  videoId,
  categoryId,
}: addOneVideoProps) => {
  const dataFromVercel = await getVideos()

  if (dataFromVercel.has(videoId)) {
    return {
      ok: false,
      error: 'The video has already been added'
    }
  }
  dataFromVercel.set(videoId, {
    id: videoId,
    userId,
    categoryId,
  })
  await saveVideos(dataFromVercel)
  return { ok: true }
}