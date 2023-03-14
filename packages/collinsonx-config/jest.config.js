const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
  rootDir: '.',
  testMatch: ['**/*.test.(ts|tsx)'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'css', 'ts', 'tsx'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'ts-jest',
      {
        useBabelrc: true,
        tsConfigFile: fromRoot('tsconfig.jest.json'),
      },
    ],
  },
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/(?!(@collinson.*)).*',
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    // '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    '@next/font/(.*)': require.resolve(
      'next/dist/build/jest/__mocks__/nextFontMock.js'
    ),
    '@lib': '<rootDir>/lib/index.ts',
    '@collinsonx/design-system/assets/logo$': '<rootDir>/__mocks__/logo.ts',
    '@collinsonx/design-system/assets/graphics/experienceX$':
      '<rootDir>/__mocks__/graphics/experienceX/index.ts',
    '\\.svg': '<rootDir>/__mocks__/svg.js',
  },
  // moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
  //   prefix: '<rootDir>/',
  // }),
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
};
