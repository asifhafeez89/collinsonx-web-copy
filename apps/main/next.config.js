const { LOUNGE_URL } = process.env;

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
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn03.collinson.cn',
        port: '',
        pathname: '/lounge-media/image/**',
      },
    ],
  },
};
