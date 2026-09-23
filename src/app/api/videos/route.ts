const videosData = new Set<string>()

export async function GET() {
  videosData.add('qULWrtxYuxk')
  videosData.add('KO-G5DVNlw4')
  videosData.add('tvnpQ0dORI8')
  videosData.add('yNMi0CBJpKA')
  videosData.add('tOMc0XCmuYQ')
  videosData.add('Vv94is3BZ3I')
  videosData.add('e1pZIfretEs')
  videosData.add('-lec--FlSJ4')
  videosData.add('NnKVD-DZmYQ')
  videosData.add('mC4GQTy5sqk')

  return Response.json({
    ok: true,
    data: Array.from(videosData)
  })
}
export async function POST(request: Request) {
  const data = await request.json()

  if (videosData.has(data.videoId)) {
    return Response.json(
      { ok: false, error: 'The video has already been added' },
      { status: 400}
    )
  }
  videosData.add(data.videoId)

  return Response.json({ ok: true })
}