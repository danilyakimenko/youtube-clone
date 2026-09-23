export type VideoDto = {
  videoId: string
  title: string
  authorName: string
  authorUrl: string
}

export type AllVideosDto = {
  ok: boolean
  data: VideoDto[]
}