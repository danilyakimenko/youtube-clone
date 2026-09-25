type OEmbedVideoInfo = {
  title: string
  author_name: string
  author_url: string
  type: string
  height: number
  width: number
  version: string
  provider_name: string
  provider_url: string
  thumbnail_height: number
  thumbnail_width: number
  thumbnail_url: string
  html: string
}

type VideoDataContent = {
  userId: string
  id: string
  categoryId: string
}

const videosData = new Map<string, VideoDataContent>([
  ['qULWrtxYuxk', { userId: '0', id: 'qULWrtxYuxk', categoryId: 'games'}],
  ['KO-G5DVNlw4', { userId: '0', id: 'KO-G5DVNlw4', categoryId: 'news'}],
  ['tvnpQ0dORI8', { userId: '0', id: 'tvnpQ0dORI8', categoryId: 'news'}],
  ['yNMi0CBJpKA', { userId: '0', id: 'yNMi0CBJpKA', categoryId: 'news'}],
  ['tOMc0XCmuYQ', { userId: '0', id: 'tOMc0XCmuYQ', categoryId: 'music'}],
  ['Vv94is3BZ3I', { userId: '0', id: 'Vv94is3BZ3I', categoryId: 'games'}],
  ['e1pZIfretEs', { userId: '0', id: 'e1pZIfretEs', categoryId: 'music'}],
  ['-lec--FlSJ4', { userId: '0', id: '-lec--FlSJ4', categoryId: 'sport'}],
  ['NnKVD-DZmYQ', { userId: '0', id: 'NnKVD-DZmYQ', categoryId: 'games'}],
  ['mC4GQTy5sqk', { userId: '0', id: 'mC4GQTy5sqk', categoryId: 'sport'}],
  ['iv3U78TaK8w', { userId: '0', id: 'iv3U78TaK8w', categoryId: 'music'}],
  ['ifmWdG3vngA', { userId: '0', id: 'ifmWdG3vngA', categoryId: 'news'}],
])

export async function GET(request: Request) {
  const urlObject = new URL(request.url)
  const userIdParam = urlObject.searchParams.get('userId')
  const videoIdParam = urlObject.searchParams.get('videoId')
  const categoryIdParam = urlObject.searchParams.get('categoryId')

  if (videoIdParam) {
    try {
      const rawResult = await fetch(`
        https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoIdParam}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      const authorUrl = videoInfo.author_url.split('/').at(-1)
      const result = {
        videoId: videoIdParam,
        authorUrl,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      }

      return Response.json({ok: true, data: result})
    }
    catch (error) {
      console.error(error)
      return Response.json({ok: false, data: null}, {status: 500})
    }
  }

  try {
    const categories = Array.from(new Set([...videosData].map((videoData) => videoData[1].categoryId)))
    const promises = [...videosData]
      .filter((videoData) => categoryIdParam ? videoData[1].categoryId === categoryIdParam : true)
      .filter((videoData) => userIdParam ? videoData[1].userId === userIdParam : true)
      .map(async (videoData) => {
        const videoId = videoData[1].id
        const categoryId = videoData[1].categoryId
        const rawResult = await fetch(`
        https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
        )
        const videoInfo = await rawResult.json() as OEmbedVideoInfo
        const authorUrl = videoInfo.author_url.split('/').at(-1)

        return {
          videoId,
          authorUrl,
          categoryId,
          title: videoInfo.title,
          authorName: videoInfo.author_name,
        }
      })
    const result = await Promise.all(promises)

    return Response.json({
      ok: true,
      data: result,
      categories
    })
  }
  catch (error) {
    console.error(error)
    return Response.json({ok: false, data: []}, {status: 500})
  }
}

export async function POST(request: Request) {
  const data = await request.json()

  if (videosData.has(data.videoId)) {
    return Response.json(
      {ok: false, error: 'The video has already been added'},
      {status: 400}
    )
  }
  videosData.set(data.videoId, {
    userId: data.userId,
    id: data.videoId,
    categoryId: data.categoryId
  })

  return Response.json({ok: true})
}