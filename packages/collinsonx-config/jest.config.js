const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
  testMatch: ['**/*.test.(ts|tsx)'],
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'css', 'ts', 'tsx'],
  testPathIgnorePatterns: ['<rootDir>/.next/'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  setupFiles: [fromRoot('./setupJest.js')],
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  moduleNameMapper: {
    // '\\.(css|less)$': '<rootDir>/tests/jest/__mocks__/styleMock.js',
    '@lib': '<rootDir>/lib/index.ts',
    '@components/(.*)$': '<rootDir>/components/$1',
    '@collinsonx/constants/(.*)': fromRoot(
      '../collinsonx-constants/src/$1/index.ts'
    ),
    '@collinsonx/design-system/assets/logo$': '<rootDir>/__mocks__/logo',
    '@collinsonx/design-system/components/loaderLifestyleX$':
      '<rootDir>/__mocks__/loader',
    '@collinsonx/design-system/assets/graphics/(.*)$':
      '<rootDir>/__mocks__/graphics/$1',
    '\\.svg': '<rootDir>/__mocks__/svg.js',
    '@collinsonx/design-system/assets/icons$': '<rootDir>/__mocks__/icon.ts',
    '@collinsonx/design-system/assets/graphics$':
      '<rootDir>/__mocks__/graphics',
    '@collinsonx/utils/queries': '<rootDir>/__mocks__/queries',
    '@collinsonx/utils/apollo': '<rootDir>/__mocks__/apollo',
  },
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/coverage/**',
    '!**/node_modules/**',
  ],
};
