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

const videosData = new Set<string>([
  'qULWrtxYuxk',
  'KO-G5DVNlw4',
  'tvnpQ0dORI8',
  'yNMi0CBJpKA',
  'tOMc0XCmuYQ',
  'Vv94is3BZ3I',
  'e1pZIfretEs',
  '-lec--FlSJ4',
  'NnKVD-DZmYQ',
  'mC4GQTy5sqk',
  'iv3U78TaK8w',
  'ifmWdG3vngA',
])

export async function GET(request: Request) {
  const urlObject = new URL(request.url)
  const videoId = urlObject.searchParams.get('videoId')
  console.log(videoId)

  if (videoId) {
    try {
      const rawResult = await fetch(`
        https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      const authorUrl = videoInfo.author_url.split('/').at(-1)

      const result = {
        videoId,
        authorUrl,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      }

      return Response.json({ok: true, data: result})
    } catch (error) {
      console.error(error)
      return Response.json({ok: false, data: null}, {status: 500})
    }
  }

  try {
    const promises = [...videosData].map(async (videoId) => {
      const rawResult = await fetch(`
        https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
      )
      const videoInfo = await rawResult.json() as OEmbedVideoInfo
      const authorUrl = videoInfo.author_url.split('/').at(-1)

      return {
        videoId,
        authorUrl,
        title: videoInfo.title,
        authorName: videoInfo.author_name,
      }
    })
    const result = await Promise.all(promises)

    return Response.json({ok: true, data: result})
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
  videosData.add(data.videoId)

  return Response.json({ok: true})
}