/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "kodamomosbucket.s3.us-west-2.amazonaws.com",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
