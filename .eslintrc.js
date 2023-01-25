module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-acme`
  extends: ['collinson'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
  },
}
