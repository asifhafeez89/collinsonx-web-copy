const { LOUNGE_URL } = process.env;

module.exports = {
  basePath: '/search',
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
        source: '/lounge',
        destination: `${LOUNGE_URL}/lounge`,
      },
      {
        source: '/lounge/:path*',
        destination: `${LOUNGE_URL}/lounge/:path*`,
      },
    ];
  },
};
