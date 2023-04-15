/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'yuta-blog-bucket.s3.ap-northeast-3.amazonaws.com',
      's3.ap-northeast-3.amazonaws.com'
    ],
    disableStaticImages: true
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/]
      },
      use: [
        {
          loader: '@svgr/webpack'
        }
      ]
    });

    return config;
  }
};

module.exports = nextConfig;
