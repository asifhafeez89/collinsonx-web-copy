module.exports = {
  presets: [
    require('@vercel/examples-ui/tailwind'),
    require('@collinson/design-system/tailwind'),
  ],
  content: [
    // All the packages that might include stories
    './node_modules/@vercel/examples-ui/**/*.js',
    './node_modules/@collinson/design-system/**/*.js',
    './node_modules/@collinson/pages/**/*.js',
  ],
}
