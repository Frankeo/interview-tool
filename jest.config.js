module.exports = {
  collectCoverage : true,
  collectCoverageFrom : [ "src/**/*.js" ],
  coveragePathIgnorePatterns : [
    "<rootDir>/src/input",
    "<rootDir>/src/output",
    "<rootDir>/src/db",
  ],
  coverageReporters : [ "json-summary", "text", "lcov" ],
  modulePathIgnorePatterns : [ "<rootDir>/src/input", "<rootDir>/src/output" ],
};
