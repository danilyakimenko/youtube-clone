import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { users } from '../../db'
import { cookies } from 'next/headers'
import { env } from '@/shared/libs/env'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'

export async function POST(request: Request) {
  const data = await request.json()
  const user = users.get(data.nickname)

  if (!user) {
    return Response.json({ok: false, message: "The user was not found"}, {status: 400})
  }

  const isPasswordsEqual = await bcrypt.compare(data.password, user.password)

  if (!isPasswordsEqual) {
    return Response.json({ok: false, message: "Invalid password"}, {status: 400})
  }

  const { id, nickname } = user
  const jwt = jsonwebtoken.sign({ id, nickname }, env.JWT_SECRET, { expiresIn: '1h' })
  const cookiesStore = await cookies()

  cookiesStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  })

  return Response.json({ ok: true, user: { id, nickname } })
}