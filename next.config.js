/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  // fontLoaders: [
  //   { loader: '@next/font/google', options: { subsets: ['latin'] } },
  // ],
  images: {
    domains: ['res.cloudinary.com'],
  },
};

module.exports = nextConfig;
