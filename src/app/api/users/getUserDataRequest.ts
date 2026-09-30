import { getUsers } from '@/app/api/blobDB'

type GetUserDataRequestProps = {
  userId: string
}

export const getUserDataRequest = async ({ userId }: GetUserDataRequestProps) => {
  const users = await getUsers()
  const user = users.get(userId)

  if (!user) {
    return { ok: false, message: "The user was not found" }
  }
  const { password: _, ...rest } = user

  return { ok: true, user: rest }
}