type UserId = string

type UserContent = {
  id: UserId
  nickname: string
  password: string
}

export type UserInfoFromToken = {
  id: UserContent['id']
  nickname: string
  iat: number
}

declare global {
  var dbUsers: Map<UserId, UserContent> | undefined
}

export const users = globalThis.dbUsers || (
  globalThis.dbUsers = new Map<UserId, UserContent>()
)