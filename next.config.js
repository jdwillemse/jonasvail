const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  images: {
    domains: ['images.prismic.io'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [576, 768, 992, 1200, 1400],
    imageSizes: [4, 8, 32, 48, 64],
  },
  swcMinify: true,
})
