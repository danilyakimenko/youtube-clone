import { z } from 'zod'

export const schema = z.object({
  nickname: z.string().trim().min(1, { message: 'minimum of 1 character' }),
  bio: z.string().trim().min(1, { message: 'minimum of 1 character' }),
  youtubeLink: z.url(),
  avatarUrl: z.url(),
})