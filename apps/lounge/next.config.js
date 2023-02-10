module.exports = {
  basePath: '/lounge',
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
      {
        source: '/graphql',
        destination: `${PRODUCTION_API_URL}`,
      },
    ];
  },
};
