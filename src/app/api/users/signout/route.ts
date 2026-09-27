import { cookies } from 'next/headers'

export async function GET() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('x-auth-token')

  if (!token?.value) {
    return Response.json({ok: true})
  }

  cookiesStore.delete('x-auth-token')

  return Response.json({ ok: true })
}