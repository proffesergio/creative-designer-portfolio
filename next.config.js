/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    NEXT_PUBLIC_VIDEO_BASE_URL:
      'https://pub-07da13bf303942fbb6513812015db427.r2.dev/videos',
  },
};

module.exports = nextConfig;
