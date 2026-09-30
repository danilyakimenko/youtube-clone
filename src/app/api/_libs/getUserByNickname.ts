import { UserId, UserContent } from '@/app/api/blobDB'

export const getUserByNickname = (nickname: string, users: Map<UserId, UserContent>) => {
  for (const [_id, userInfo] of users) {
    if (userInfo.nickname === nickname) {
      return userInfo
    }
  }
  return null
}