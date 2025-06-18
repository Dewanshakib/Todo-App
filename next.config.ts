import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com', // github
      },
       {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // github
      },
    ],
  },
};

export default nextConfig;