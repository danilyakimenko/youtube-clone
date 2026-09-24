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
  id: string
  categoryId: string
}

const videosData = new Map<string, VideoDataContent>([
  ['qULWrtxYuxk', {id: 'qULWrtxYuxk', categoryId: 'games'}],
  ['KO-G5DVNlw4', {id: 'KO-G5DVNlw4', categoryId: 'news'}],
  ['tvnpQ0dORI8', {id: 'tvnpQ0dORI8', categoryId: 'news'}],
  ['yNMi0CBJpKA', {id: 'yNMi0CBJpKA', categoryId: 'news'}],
  ['tOMc0XCmuYQ', {id: 'tOMc0XCmuYQ', categoryId: 'music'}],
  ['Vv94is3BZ3I', {id: 'Vv94is3BZ3I', categoryId: 'games'}],
  ['e1pZIfretEs', {id: 'e1pZIfretEs', categoryId: 'music'}],
  ['-lec--FlSJ4', {id: '-lec--FlSJ4', categoryId: 'sport'}],
  ['NnKVD-DZmYQ', {id: 'NnKVD-DZmYQ', categoryId: 'games'}],
  ['mC4GQTy5sqk', {id: 'mC4GQTy5sqk', categoryId: 'sport'}],
  ['iv3U78TaK8w', {id: 'iv3U78TaK8w', categoryId: 'music'}],
  ['ifmWdG3vngA', {id: 'ifmWdG3vngA', categoryId: 'news'}],
])

export async function GET(request: Request) {
  const urlObject = new URL(request.url)
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
  videosData.set(data.videoId, {id: data.videoId, categoryId: data.categoryId})

  return Response.json({ok: true})
}