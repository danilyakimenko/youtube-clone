import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { users } from '../db'
import { cookies } from 'next/headers'

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
  const jwt = jsonwebtoken.sign({ id, nickname }, '1234')
  const cookiesStore = await cookies()

  cookiesStore.set('x-auth-token', jwt, {
    maxAge: 1000,
    httpOnly: true,
    secure: true,
  })

  return Response.json({ ok: true, user: { id, nickname } })
}