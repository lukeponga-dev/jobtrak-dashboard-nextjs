
import type { NextConfig } from 'next';

/**
 * Configuration options for the Next.js application.
 * This file allows customization of the build process, server behavior, and other features.
 */
const nextConfig: NextConfig = {
  transpilePackages: [
    '@genkit-ai/ai',
    '@genkit-ai/googleai',
    '@genkit-ai/next',
  ],
  typescript: {
    /**
     * If set to true, TypeScript errors will not fail the build.
     * This is useful for prototyping but should be used with caution in production.
     */
    ignoreBuildErrors: true,
  },

  /**
   * ESLint-specific configurations.
   */
  eslint: {
    /**
     * If set to true, ESLint will not run during the build process.
     * This can speed up builds, but it means linting errors won't be caught at build time.
     */
    ignoreDuringBuilds: true,
  },

  /**
   * Configuration for the Next.js Image component.
   * It defines which remote domains are allowed for image optimization.
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },

  /**
   * Experimental features that may change or be removed in future versions of Next.js.
   */
  experimental: {
    serverActions: {
      /**
       * Sets the maximum size for the request body of Server Actions.
       * This helps prevent denial-of-service attacks that use large payloads.
       */
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
