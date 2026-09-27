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

// -------------

type VideoId = string

type VideoDataContent = {
  userId: string
  id: VideoId
  categoryId: string
}

// -------------

declare global {
  var dbUsers: Map<UserId, UserContent> | undefined
  var dbVideos: Map<VideoId, VideoDataContent> | undefined
}

export const users = globalThis.dbUsers || (
  globalThis.dbUsers = new Map<UserId, UserContent>()
)

export const videos = globalThis.dbVideos || (
  globalThis.dbVideos = new Map<VideoId, VideoDataContent>([
    ['qULWrtxYuxk', { userId: '0', id: 'qULWrtxYuxk', categoryId: 'games'}],
    ['KO-G5DVNlw4', { userId: '0', id: 'KO-G5DVNlw4', categoryId: 'news'}],
    ['tvnpQ0dORI8', { userId: '0', id: 'tvnpQ0dORI8', categoryId: 'news'}],
    ['yNMi0CBJpKA', { userId: '0', id: 'yNMi0CBJpKA', categoryId: 'news'}],
    ['tOMc0XCmuYQ', { userId: '0', id: 'tOMc0XCmuYQ', categoryId: 'music'}],
    ['Vv94is3BZ3I', { userId: '0', id: 'Vv94is3BZ3I', categoryId: 'games'}],
    ['e1pZIfretEs', { userId: '0', id: 'e1pZIfretEs', categoryId: 'music'}],
    ['-lec--FlSJ4', { userId: '0', id: '-lec--FlSJ4', categoryId: 'sport'}],
    ['NnKVD-DZmYQ', { userId: '0', id: 'NnKVD-DZmYQ', categoryId: 'games'}],
    ['mC4GQTy5sqk', { userId: '0', id: 'mC4GQTy5sqk', categoryId: 'sport'}],
    ['iv3U78TaK8w', { userId: '0', id: 'iv3U78TaK8w', categoryId: 'music'}],
    ['ifmWdG3vngA', { userId: '0', id: 'ifmWdG3vngA', categoryId: 'news'}],
  ])
)