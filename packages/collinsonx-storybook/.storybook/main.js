import { dirname, join } from "path";
module.exports = {
  stories: ['../../collinsonx-design-system/src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
  ],

  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {}
  },

  staticDirs: ['../public'],

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

  docs: {
    autodocs: true
  }
};

function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, "package.json")));
}
