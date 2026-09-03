import { fileURLToPath } from 'node:url';

import withBundleAnalyzer from '@next/bundle-analyzer';
import createJiti from 'jiti';

const BASE_PATH = process.env.BASE_PATH || '';
const ENABLE_STATIC_EXPORT = process.env.ENABLE_STATIC_EXPORT === 'true';

const rewrites = () => {
  return [
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
    { source: '/api/ping', destination: '/api/health' },
  ];
};

const redirects = () => {
  return [];
};

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti('./src/env');

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  // Just to ensure that React is always on strict mode
  reactStrictMode: true,
  // We allow the BASE_PATH to be overridden in case that the Website
  // is being built on a subdirectory (e.g. /nodejs-website)
  basePath: BASE_PATH,
  images: {
    // We disable image optimisation during static export builds
    unoptimized: ENABLE_STATIC_EXPORT,
    // We allow SVGs to be used as images
    dangerouslyAllowSVG: true,
    // We add it to the remote pattern for the static images we use from GitHub
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fonts.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // On static export builds we want to enable the export feature
  output: ENABLE_STATIC_EXPORT ? 'export' : undefined,
  // This configures all the Next.js rewrites, which are used for rewriting internal URLs into other internal Endpoints
  // This feature is not supported within static export builds, hence we pass an empty array if static exports are enabled
  rewrites: !ENABLE_STATIC_EXPORT ? rewrites : undefined,
  // This configures all Next.js redirects
  redirects: !ENABLE_STATIC_EXPORT ? redirects : undefined,
  // We don't want to run Type Checking on Production Builds
  // as we already check it on the CI within each Pull Request
  typescript: { ignoreBuildErrors: true },
  experimental: {
    // A list of packages that Next.js should automatically evaluate and optimise the imports for.
    // @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
    optimizePackageImports: [
      '@radix-ui/react-avatar',
      '@radix-ui/react-select',
      '@radix-ui/react-toast',
      'tailwindcss',
    ],
  },
};

export default bundleAnalyzer(nextConfig);
