import bcrypt from 'bcrypt'
import { users } from '../db'

export async function POST(request: Request) {
  const data = await request.json()
  const user = users.get(data.nickname)

  if (!user) {
    return Response.json({ok: false, message: "The user was not found"}, {status: 400})
  }

  const hashedPassword = await bcrypt.hash(data.password, 10)

  if (user.password !== hashedPassword) {
    return Response.json({ok: false, message: "Invalid password"}, {status: 400})
  }

  const {
    id,
    nickname,
  } = user

  return Response.json({ ok: true, user: { id, nickname } })
}