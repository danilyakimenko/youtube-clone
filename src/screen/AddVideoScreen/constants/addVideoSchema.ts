import { isAllowedHost, YOUTUBE_DOMAINS } from '@/shared/libs'
import { z } from 'zod'

export const schema = z.object({
  videoUrl: z
    .string()
    .min(1, { message: 'The field must not be empty.' })
    .superRefine((url, ctx) => {
      let parsedURL: URL
      try {
        parsedURL = new URL(url)
      }
      catch {
        ctx.addIssue({
          code: "custom",
          message: 'The field must contain a link',
          input: url,
        })
        return
      }

      if (!isAllowedHost(parsedURL.host, YOUTUBE_DOMAINS)) {
        ctx.addIssue({
          code: "custom",
          message: 'The link should be on YouTube.',
          input: url,
        })
      }
    }),
  videoCategory: z
    .string()
})