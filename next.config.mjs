/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/projects",
        permanent: true,
      },
      {
        source: "/news",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
