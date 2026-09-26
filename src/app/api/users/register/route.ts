import bcrypt from 'bcrypt'
import { users } from '../db'

export async function POST(request: Request) {
  const data = await request.json()
  // const user =

  if (users.has(data.nickname)) {
    return Response.json({ok: false, message: "A user with this nickname has already been registered"}, {status: 400})
  }

  const id = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(data.password, 10)

  users.set(data.nickname, { id, nickname: data.nickname, password: hashedPassword })
  return Response.json({ok: true})
}