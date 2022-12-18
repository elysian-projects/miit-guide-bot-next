module.exports = {
  "roots": [
    "<rootDir>/dist/"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  errorOnDeprecated: true,
  // collectCoverage: true,
  // coverageDirectory: "coverage",
  // coverageProvider: "v8",
};
