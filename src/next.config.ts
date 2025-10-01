
import type { NextConfig } from 'next';

/**
 * Configuration options for the Next.js application.
 * This file allows customization of the build process, server behavior, and other features.
 */
const nextConfig: NextConfig = {
  /* General config options can be placed here */
  output: 'standalone', // Enables standalone output for better deployment
  
  /**
   * TypeScript-specific configurations.
   */
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
   * Packages that should be transpiled by Next.js.
   */
  transpilePackages: ['@genkit-ai/ai', '@genkit-ai/core', '@genkit-ai/googleai', '@genkit-ai/next'],
};

export default nextConfig;
