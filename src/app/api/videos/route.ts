import { videos } from '@/app/api/db'

export async function POST(request: Request) {
  const data = await request.json()

  if (videos.has(data.videoId)) {
    return Response.json(
      {ok: false, error: 'The video has already been added'},
      {status: 400}
    )
  }
  videos.set(data.videoId, {
    userId: data.userId,
    id: data.videoId,
    categoryId: data.categoryId
  })

  return Response.json({ok: true})
}