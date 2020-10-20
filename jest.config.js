module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ["src/**/*.js"],
    coveragePathIgnorePatterns: ["<rootDir>/src/input", "<rootDir>/src/output"],
    coverageReporters: ["json", "html"],
    modulePathIgnorePatterns: ["<rootDir>/src/input", "<rootDir>/src/output"]
};