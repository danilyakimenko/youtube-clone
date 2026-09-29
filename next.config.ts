import type { NextConfig } from "next";
import { schema } from '@/shared/libs/env'

schema.parse(process.env)

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://img.youtube.com/vi/**')],
  },

  sassOptions: {
    additionalData: `
          @use '@/shared/styles/helpers' as *;
        `
  },

  turbopack: {
    resolveAlias: {
      constants: '@/shared/styles/helpers/constants.scss',
      functions: '@/shared/styles/helpers/functions.scss',
      media: '@/shared/styles/helpers/media.scss',
      mixins: '@/shared/styles/helpers/mixins.scss',
      utils: '@/shared/styles/helpers/utils.scss',
    },
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;