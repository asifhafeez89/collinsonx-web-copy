const { SEARCH_URL } = process.env;

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
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
    ];
  },
};
