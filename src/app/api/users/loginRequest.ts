'use server'

import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import { users } from '../db'
import { cookies } from 'next/headers'
import { env } from '@/shared/libs/env'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'

type loginProps = {
  nickname: string
  password: string
}

export const loginRequest = async (data: loginProps) => {
  const user = users.get(data.nickname)

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