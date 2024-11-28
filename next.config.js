/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['cdn.builder.io'],
    // 或者使用 remotePatterns 更安全
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
        pathname: '/api/v1/image/assets/**',
      },
    ],
  },
};

export default nextConfig;
