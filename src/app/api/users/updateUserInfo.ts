'use server'

import { getUsers, saveUsers, UserContent } from '@/app/api/blobDB'
import { getMeDataRequest } from '@/app/api/users/getMeDataRequest'

type UpdateUserProfileInput = {
  bio?: string
  avatarUrl?: string
}

export async function updateUserProfile(
  patch: UpdateUserProfileInput,
): Promise<UserContent | null> {
  const userInfo = await getMeDataRequest()

  if (!userInfo.user) return null

  const users = await getUsers()
  const user = users.get(userInfo.user.id)

  if (!user) return null

  const updatedUser: UserContent = { ...user, ...patch }

  users.set(userInfo.user.id, updatedUser)
  await saveUsers(users)

  return updatedUser
}