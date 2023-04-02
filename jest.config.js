module.exports = {
  "roots": [
    "<rootDir>/tests/"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  errorOnDeprecated: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};
