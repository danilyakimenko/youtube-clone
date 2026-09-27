import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { UserInfoFromToken, users } from './db'
import { env } from '@/shared/libs'

export async function GET() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('x-auth-token')

  if (!token?.value) {
    return Response.json({ok: false, message: "The token is outdated"}, {status: 400})
  }

  try {
    const userInfo = jsonwebtoken.verify(token.value, env.JWT_SECRET) as UserInfoFromToken
    const user = users.get(userInfo.nickname)

    if (!user) {
      return Response.json({ok: false, message: "The user was not found"}, {status: 500})
    }

    const { id, nickname } = user

    return Response.json({ ok: true, user: { id, nickname } })
  }
  catch {
    return Response.json(
      { ok: false, message: 'Invalid or expired token' },
      { status: 400 }
    )
  }
}