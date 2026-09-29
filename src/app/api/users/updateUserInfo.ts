'use server'

import { getUsers, saveUsers, UserContent } from '@/app/api/blobDB'
import { getUsersDataRequest } from '@/app/api/users/getUsersDataRequest'

type UpdateUserProfileInput = {
  bio?: string
  avatarUrl?: string
}

export async function updateUserProfile(
  patch: UpdateUserProfileInput,
): Promise<UserContent | null> {
  const userInfo = await getUsersDataRequest()

  if (!userInfo.user) return null

  const users = await getUsers()
  const user = users.get(userInfo.user.nickname)

  if (!user) return null

  const updatedUser: UserContent = { ...user, ...patch }

  users.set(userInfo.user.nickname, updatedUser)
  await saveUsers(users)

  return updatedUser
}