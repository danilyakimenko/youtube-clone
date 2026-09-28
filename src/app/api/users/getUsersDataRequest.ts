import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { env } from '@/shared/libs/env'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'
import { getUsers, UserInfoFromToken } from '@/app/api/blobDB'

export const getUsersDataRequest = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get(AUTH_COOKIE_NAME)

  if (!token?.value) {
    return { ok: false, message: "The token is outdated" }
  }
  const users = await getUsers()
  const userInfo = jsonwebtoken.verify(token.value, env.JWT_SECRET) as UserInfoFromToken
  const user = users.get(userInfo.nickname)

  if (!user) {
    return { ok: false, message: "The user was not found" }
  }

  const { id, nickname } = user

  return {
    ok: true, user: { id, nickname }
  }
}