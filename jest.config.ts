import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  coveragePathIgnorePatterns: ["/node_modules/"],
  coverageProvider: "v8",
  coverageReporters: ["json"],
  testMatch: ["**/src/**/*.test.ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
};

export default config;
