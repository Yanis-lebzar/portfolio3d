/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/project-gallery",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
