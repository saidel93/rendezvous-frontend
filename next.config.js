/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io', 'randomuser.me', 'images.unsplash.com'],
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },
}
module.exports = nextConfig
