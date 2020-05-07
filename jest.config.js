const path = require('path');
const fs = require('fs');

// Check for foremanReact files provided by Foreman and make available as module in Jest.
const checkForForemanReact = (foremanLocations, foremanReact) => {
  const currentDir = process.cwd();

  let foremanReactFullPath;
  foremanLocations.forEach((relativeForemanPath) => {
    if (fs.existsSync(path.join(currentDir, relativeForemanPath))) {
      const fullPath = path.join(currentDir, relativeForemanPath, foremanReact);
      if (fs.existsSync(fullPath)) foremanReactFullPath = fullPath;
    }
  });
  return foremanReactFullPath;
};

const foremanReactRelative = 'webpack/assets/javascripts/react_app';
const possibleForemanLocations = ['./foreman', '../foreman', '../../foreman'];
const notFound = 'Foreman directory cannot be found! These tests require Foreman to be present ' +
'in either a parent, sibling, or child directory relative to Katello and contain the expected ' +
`files in foreman/${foremanReactRelative}.`;

const foremanReactFull = checkForForemanReact(possibleForemanLocations, foremanReactRelative);
// Will clean this up, all this logic in the jest config should be it's own package to be shared
// by plugins
const foremanFull = foremanReactFull.replace(foremanReactRelative, '');
if (!foremanReactFull) throw new Error(notFound);

// Jest configuration
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'webpack/**/*.js',
    '!webpack/**/bundle*',
  ],
  coverageReporters: [
    'lcov',
  ],
  testURL: 'http://localhost/',
  setupFiles: [
    './webpack/test_setup.js',
  ],
  setupFilesAfterEnv: [
    './webpack/global_test_setup.js',
    '@testing-library/jest-dom'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/foreman/',
    '<rootDir>/.+fixtures.+',
    '<rootDir>/engines',
  ],
  moduleDirectories: [
    `${foremanFull}node_modules`,
    `${foremanFull}node_modules/@theforeman/vendor-core/node_modules`,
    'node_modules',
    'webpack/test-utils',
  ],
  modulePathIgnorePatterns: [
    '<rootDir>/foreman/',
  ],
  moduleNameMapper: {
    '^.+\\.(css|scss)$': 'identity-obj-proxy',
    '^foremanReact(.*)$': `${foremanReactFull}$1`,
  },
};

