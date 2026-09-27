type UserId = string

type UserContent = {
  id: UserId
  nickname: string
  password: string
}

export const users = globalThis.dbUsers || (
  globalThis.dbUsers = new Map<UserId, UserContent>()
)