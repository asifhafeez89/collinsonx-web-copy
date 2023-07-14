const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

const config = require('@collinsonx/config/jest.config');

Math.random = () => 0;

module.exports = {
  ...config,
  rootDir: '.',
  setupFilesAfterEnv: [fromRoot('./setupJest.js')],
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
