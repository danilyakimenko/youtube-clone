import { getUsers } from '@/app/api/blobDB'

type GetUserDataRequestProps = {
  nickname: string
}

export const getUserDataRequest = async ({ nickname }: GetUserDataRequestProps) => {
  const users = await getUsers()
  const user = users.get(nickname)

  if (!user) {
    return { ok: false, message: "The user was not found" }
  }

  const { password: _, ...rest } = user

  return { ok: true, user: rest }
}