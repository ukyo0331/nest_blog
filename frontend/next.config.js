/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['yuta-blog-bucket.s3.ap-northeast-3.amazonaws.com'],
  }
}

module.exports = nextConfig
