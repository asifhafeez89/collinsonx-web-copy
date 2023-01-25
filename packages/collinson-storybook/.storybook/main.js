// const path = require('path')

// module.exports = {
//   stories: [
//     "../src/components/**/*.stories.@(js|jsx|ts|tsx)"
//   ],
//   addons: [
//     // https://storybook.js.org/addons/@storybook/addon-links
//     '@storybook/addon-links',
//     // https://storybook.js.org/docs/react/essentials/introduction
//     '@storybook/addon-essentials',
//   ],
//   framework: '@storybook/react',
//   features: {
//     storyStoreV7: true, // build stories on demand
//   },
// }

module.exports = {
    "stories": [
      "../src/**/*.stories.mdx",
      "../src/**/*.stories.@(js|jsx|ts|tsx)",
      "../src/components/**/*.stories.mdx",
      "../src/components/**/*.stories.@(js|jsx|ts|tsx)",
      "../../collinson-design-system/src/**/*.stories.@(js|jsx|ts|tsx)"
    ],
    "addons": [
      "@storybook/addon-links",
      "@storybook/addon-essentials",
      "@storybook/addon-interactions"
    ],
    "framework": "@storybook/react"
}