import bcrypt from 'bcrypt'
import { users } from '../db'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const data = await request.json()

  if (users.has(data.nickname)) {
    return Response.json({ok: false, message: "A user with this nickname has already been registered"}, {status: 400})
  }

  const id = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(data.password, 10)

  users.set(data.nickname, { id, nickname: data.nickname, password: hashedPassword })

  const jwt = jsonwebtoken.sign({ id, nickname: data.nickname }, '1234')
  const cookiesStore = await cookies()

  cookiesStore.set('x-auth-token', jwt, {
    maxAge: 1000,
    httpOnly: true,
    secure: true,
  })

  return Response.json({ok: true})
}