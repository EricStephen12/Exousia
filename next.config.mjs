/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'img.clerk.com', 'res.cloudinary.com'],
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/auth/sign-in',
        destination: '/sign-in',
        permanent: true,
      },
      {
        source: '/auth/sign-up',
        destination: '/sign-up',
        permanent: true,
      },
    ];
  },
  // Required for Clerk
  typescript: {
    ignoreBuildErrors: true, // Remove this in production
  },
  // Enable server components
  experimental: {
    serverComponentsExternalPackages: ['@clerk/nextjs/server'],
  },
  // Handle Clerk webhooks
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;