module.exports = {
  stories: ['../../collinsonx-design-system/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config, { configType }) => {
    config.module.rules = [
      ...config.module.rules.map((rule) => {
        if (/svg/.test(rule.test)) {
          // Silence the Storybook loaders for SVG files
          return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
      }),
      // Add your custom SVG loader
      {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      },
    ];

    // Return the altered config
    return config;
  },
};
