module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js"],
  coveragePathIgnorePatterns: ["<rootDir>/src/input", "<rootDir>/src/output"],
  coverageReporters: ["json-summary", "text", "lcov"],
  modulePathIgnorePatterns: ["<rootDir>/src/input", "<rootDir>/src/output"],
};
