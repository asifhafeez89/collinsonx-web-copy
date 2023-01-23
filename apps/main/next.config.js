const { SEARCH_URL } = process.env

module.exports = {
  async rewrites() {
    return [
      /**
       * Rewrites for Multi Zones
       */
      {
        source: '/search',
        destination: `${SEARCH_URL}/search`,
      },
      {
        source: '/search/:path*',
        destination: `${SEARCH_URL}/search/:path*`,
      },
    ]
  },
}
