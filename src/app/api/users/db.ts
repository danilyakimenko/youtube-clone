type UserId = string

type UserContent = {
  id: UserId
  nickname: string
  password: string
}

export const users = new Map<UserId, UserContent>()