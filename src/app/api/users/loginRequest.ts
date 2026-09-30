'use server'

import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { env } from '@/shared/libs/env'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'
import { getUsers } from '@/app/api/blobDB'
import { getUserByNickname } from '@/app/api/_libs/getUserByNickname'

type loginProps = {
  nickname: string
  password: string
}

export const loginRequest = async (data: loginProps) => {
  const users = await getUsers()
  const user = getUserByNickname(data.nickname, users)

  if (!user) {
    return {
      ok: false,
      message: "The user was not found"
    }
  }
  const isPasswordsEqual = await bcrypt.compare(data.password, user.password)

  if (!isPasswordsEqual) {
    return {
      ok: false,
      message: "Invalid password"
    }
  }
  const { id, nickname } = user
  const jwt = jsonwebtoken.sign({ id, nickname }, env.JWT_SECRET, { expiresIn: '1h' })
  const cookiesStore = await cookies()

  cookiesStore.set(AUTH_COOKIE_NAME, jwt, {
    maxAge: 3600,
    httpOnly: true,
    secure: true,
  })

  return {
    ok: true,
    user: { id, nickname }
  }
}