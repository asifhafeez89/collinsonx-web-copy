const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

const config = require('@collinsonx/config/jest.config');

module.exports = {
  ...config,
  rootDir: '.',
  coveragePathIgnorePatterns: ['./logo/index.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        tsconfig: fromRoot('tsconfig.jest.json'),
      },
    ],
  },
};
