export async function POST(request: Request) {
  const data = await request.json()

  console.log('data', data)

  return Response.json({ok: true})
}