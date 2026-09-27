import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { UserInfoFromToken, users } from './db'

export async function GET() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('x-auth-token')

  if (!token?.value) {
    return Response.json({ok: false, message: "The token is outdated"}, {status: 400})
  }

  const userInfo = jsonwebtoken.verify(token.value, '1234') as UserInfoFromToken
  const user = users.get(userInfo.nickname)

  if (!user) {
    return Response.json({ok: false, message: "The user was not found"}, {status: 500})
  }

  const { id, nickname } = user


  return Response.json({ ok: true, user: { id, nickname } })
}