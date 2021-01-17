import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "vue"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/src/shared/$1"
 }
};

export default config;
