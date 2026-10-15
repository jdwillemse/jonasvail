const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [576, 768, 992, 1200, 1400],
    imageSizes: [4, 8, 32, 48, 64],
  },
  // Client URLs come from client names, which renamed Ketel One's.
  async redirects() {
    return [
      {
        source: '/ketel-one/:path*',
        destination: '/ketel-one-vodka/:path*',
        permanent: true,
      },
    ]
  },
}
