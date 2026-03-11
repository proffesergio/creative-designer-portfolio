/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_VIDEO_BASE_URL: process.env.NEXT_PUBLIC_VIDEO_BASE_URL,
  },
};

module.exports = nextConfig;
