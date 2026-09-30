import { cookies } from 'next/headers'
import { AUTH_COOKIE_NAME } from '@/shared/constants/cookiesNames'
import { UserInfoFromToken } from '@/app/api/blobDB'
import jsonwebtoken from 'jsonwebtoken'
import { env } from '@/shared/libs/env'

export const getUserInfoFromAuthToken = async () => {
  const cookiesStore = await cookies()
  const token = cookiesStore.get(AUTH_COOKIE_NAME)

  if (!token?.value) return null

  return jsonwebtoken.verify(token.value, env.JWT_SECRET) as UserInfoFromToken
}