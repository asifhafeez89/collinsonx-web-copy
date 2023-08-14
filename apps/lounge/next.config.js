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
