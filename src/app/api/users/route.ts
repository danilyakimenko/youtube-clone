import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { users } from './db'

export async function GET() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get('x-auth-token')

  if (!token) {
    return Response.json({ok: false, message: "The token is outdated"}, {status: 400})
  }

  const userInfo = jsonwebtoken.verify(token.value, '1234')
  console.log('userinfo', userInfo)
  const user = users.get()
  // const hashedPassword = await bcrypt.hash(data.password, 10)

  // if (user.password !== hashedPassword) {
  //   return Response.json({ok: false, message: "Invalid password"}, {status: 400})
  // }
  //
  // const {
    // id,
    // nickname,
  // } = user
  //
  //
  // cookiesStore.set('x-auth-token', id, {
  //   maxAge: 20,
  //   httpOnly: true,
  //   secure: true,
  // })

  // return Response.json({ ok: true, user: { id, nickname } })
}