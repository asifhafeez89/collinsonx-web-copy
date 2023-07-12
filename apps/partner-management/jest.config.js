const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

const config = require('@collinsonx/config/jest.config');

module.exports = {
  ...config,
  rootDir: '.',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        babelConfig: true,
        tsconfig: fromRoot('tsconfig.jest.json'),
      },
    ],
  },
};
