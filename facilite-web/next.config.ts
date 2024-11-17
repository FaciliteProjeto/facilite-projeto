import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'e7.pngegg.com',
      },
    ],
  },
}

export default nextConfig
