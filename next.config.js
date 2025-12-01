/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Image optimization for production
  images: {
    domains: [],
    unoptimized: false,
  },
  // Ensure environment variables are available at build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Optimize for production
  swcMinify: true,
  // Compress output
  compress: true,
}

module.exports = nextConfig
