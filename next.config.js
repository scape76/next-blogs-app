/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "next-blogs-bucket.s3.eu-central-1.amazonaws.com"],
  },
};

module.exports = nextConfig;
