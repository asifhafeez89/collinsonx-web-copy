const { LOUNGE_URL, SEARCH_URL, PRODUCTION_API_URL, AUTH_API_URL } =
  process.env;

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
        source: '/lounge',
        destination: `${LOUNGE_URL}/lounge`,
      },
      {
        source: '/lounge/:path*',
        destination: `${LOUNGE_URL}/lounge/:path*`,
      },
      {
        source: '/search',
        destination: `${SEARCH_URL}/search`,
      },
      {
        source: '/search/:path*',
        destination: `${SEARCH_URL}/search/:path*`,
      },
      {
        source: '/graphql',
        destination: `${PRODUCTION_API_URL}`,
      },
      {
        source: '/api/remote/auth/:path*',
        destination: `${AUTH_API_URL}`,
      },
    ];
  },
};
