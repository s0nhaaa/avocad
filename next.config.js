/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "prod-image-cdn.tensor.trade",
      },
    ],
  },
}

module.exports = nextConfig
