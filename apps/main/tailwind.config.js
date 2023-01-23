module.exports = {
  presets: [
    require('@vercel/examples-ui/tailwind'),
    require('@collinson/design-system/tailwind'),
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Add the external packages that are using Tailwind CSS
    './node_modules/@vercel/examples-ui/**/*.js',
    './node_modules/@collinson/design-system/**/*.js',
    './node_modules/@collinson/pages/**/*.js',
  ],
}
