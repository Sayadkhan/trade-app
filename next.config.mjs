/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.pravatar.cc",
      "www.pexels.com",
      "images.pexels.com",
      "coin-images.coingecko.com", // ✅ fixed here
      "sagar-nepal.tanvirhasan.dev",
    ],
  },
};

export default nextConfig;
