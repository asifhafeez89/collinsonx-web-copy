const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
  testMatch: ['**/*.test.(ts|tsx)'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'css', 'ts', 'tsx'],
  testPathIgnorePatterns: ['<rootDir>/.next/'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  setupFiles: [fromRoot('./setupJest.js')],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleNameMapper: {
    // '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    'next/font/(.*)': require.resolve(
      'next/dist/build/jest/__mocks__/nextFontMock.js'
    ),
    '@lib': '<rootDir>/lib/index.ts',
    '@components/(.*)$': '<rootDir>/components/$1',
    '@collinsonx/design-system/assets/logo$': '<rootDir>/__mocks__/logo',
    '@collinsonx/design-system/components/loaderLifestyleX$':
      '<rootDir>/__mocks__/loader',
    '@collinsonx/design-system/assets/graphics/(.*)$':
      '<rootDir>/__mocks__/graphics/$1',
    '\\.svg': '<rootDir>/__mocks__/svg.js',
    '@collinsonx/design-system/assets/icons$': '<rootDir>/__mocks__/icon.ts',
    '@collinsonx/design-system/assets/graphics$':
      '<rootDir>/__mocks__/graphics',
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
