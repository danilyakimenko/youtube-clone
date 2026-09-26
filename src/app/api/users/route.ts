import bcrypt from 'bcrypt'

type UserId = string

type UserContent = {
  id: UserId
  nickname: string
  password: string
}

const users = new Map<UserId, UserContent>()

export async function POST(request: Request) {
  const data = await request.json()

  if (users.has(data.nickname)) {
    return Response.json({ok: false, message: "A user with this nickname has already been registered"}, {status: 400})
  }

  const id = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(data.password, 10)

  users.set(data.nickname, { id, nickname: data.nickname, password: hashedPassword })
  return Response.json({ok: true})
}