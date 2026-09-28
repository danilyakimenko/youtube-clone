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
  experimental: {
    viewTransition: true,
  }
};

export default nextConfig;
