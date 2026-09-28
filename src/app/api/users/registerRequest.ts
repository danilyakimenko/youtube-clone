'use server'

import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { env } from '@/shared/libs/env'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'
import { getUsers, saveUsers } from '@/app/api/blobDB'

type registerProps = {
  nickname: string
  password: string
}

export const registerRequest = async (data: registerProps) => {
  const users = await getUsers()

  if (users.has(data.nickname)) {
    return {
      ok: false,
      message: "A user with this nickname has already been registered"
    }
  }
  const id = crypto.randomUUID()
  const hashedPassword = await bcrypt.hash(data.password, 10)

  users.set(data.nickname, { id, nickname: data.nickname, password: hashedPassword })

  await saveUsers(users)

  const jwt = jsonwebtoken.sign({ id, nickname: data.nickname }, env.JWT_SECRET, { expiresIn: '1h' })
  const cookiesStore = await cookies()

  cookiesStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  })
  return {ok: true}
}