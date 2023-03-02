const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

module.exports = {
  rootDir: ".",
  testMatch: [
    '**/*.test.(ts|tsx)',
  ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [
    'js',
    'jsx',
    'css',
    'ts',
    'tsx'
  ],
  transform: {
      "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
      "ts-jest": {
        "useBabelrc": true,
        "tsConfigFile": "./tsconfig.jest.json"
      }
    },
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' } )
};