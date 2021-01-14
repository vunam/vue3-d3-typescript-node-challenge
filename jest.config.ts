import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  collectCoverage: true,
  transform: {
    "^.+\\.(ts)$": "ts-jest"
  },
  "moduleNameMapper": {
    "@shared/(.*)": "<rootDir>/src/shared/$1"
 }
};

export default config;
