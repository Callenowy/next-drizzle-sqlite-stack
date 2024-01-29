/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  output: 'standalone',

  experimental: {
    serverComponentsExternalPackages: ['@node-rs/argon2'],
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/server-list',
        permanent: true,
      },
      {
        source: '/auth/login',
        destination: '/server-list',
        permanent: true,
        has: [
          {
            type: 'cookie',
            key: 'authjs.session-token',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
