const path = require('path')
const foremanReact = path.join(__dirname, "../foreman/webpack/assets/javascripts/react_app/")

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "webpack/**/*.js",
    "!webpack/**/bundle*"
  ],
  coverageReporters: [
    "lcov"
  ],
  testURL: "http://localhost/",
  setupFiles: [
    "raf/polyfill",
    "./webpack/test_setup.js"
  ],
  setupFilesAfterEnv: [
    "./webpack/global_test_setup.js",
    "@testing-library/jest-dom"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/foreman/",
    "<rootDir>/.+fixtures.+",
    "<rootDir>/engines"
  ],
  moduleDirectories: [
    "node_modules/@theforeman/vendor-core/node_modules",
    "node_modules",
    "webpack/test-utils"
  ],
  moduleNameMapper: {
    "^.+\\.(css|scss)$": "identity-obj-proxy",
    "foremanReact(.*)$": `${foremanReact}$1`
  }
}
