const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // Jest compiles these ES-module-only packages through next/jest.
  transpilePackages: ['@portabletext/react', '@portabletext/toolkit'],
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    deviceSizes: [576, 768, 992, 1200, 1400],
    imageSizes: [4, 8, 32, 48, 64],
  },
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/Information', destination: '/about', permanent: true },
      // Client URLs came from client names, which renamed Ketel One's.
      {
        source: '/ketel-one/:path*',
        destination: '/ketel-one-vodka/:path*',
        permanent: true,
      },
    ]
  },
})
