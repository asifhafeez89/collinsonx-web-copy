const path = require('path')

module.exports = {
  stories: [
    {
      directory: '../../collinsonx-design-system/src/**',
      files: '*.stories.*'
    },
  ],
  addons: [
    // https://storybook.js.org/addons/@storybook/addon-links
    '@storybook/addon-links',
    // https://storybook.js.org/docs/react/essentials/introduction
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true, // build stories on demand
  },
  async viteFinal(config, { configType }) {
    // customize the Vite config here
    return config
  },
}
