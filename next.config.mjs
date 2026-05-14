/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['advh.no'],
  },
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
}

export default nextConfig
