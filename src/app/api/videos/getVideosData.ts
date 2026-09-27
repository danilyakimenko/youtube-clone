import { videos } from '@/app/api/db'
import { GetAllVideosDto } from '@/shared/types/typesFromBackend'
import { OEmbedVideoInfo } from '@/app/api/videos/types'

type GetVideosDataProps = {
  categoryIdParam?: string
  userIdParam?: string
}

export const getVideosData = async ({
  categoryIdParam,
  userIdParam
}: GetVideosDataProps = {}): Promise<GetAllVideosDto> => {
  const categories = Array.from(new Set([...videos].map((videoData) => videoData[1].categoryId)))
  const promises = [...videos]
    .filter((videoData) => categoryIdParam ? videoData[1].categoryId === categoryIdParam : true)
    .filter((videoData) => userIdParam ? videoData[1].userId === userIdParam : true)
    .map(async (videoData) => {
      const videoId = videoData[1].id
      const categoryId = videoData[1].categoryId
      const rawResult = await fetch(`
        https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      const authorUrl = videoInfo.author_url.split('/').at(-1) || ''

      return {
        videoId,
        authorUrl,
        categoryId,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      }
    })
  const result = await Promise.all(promises)

  return {
    ok: true,
    data: result,
    categories
  }
}