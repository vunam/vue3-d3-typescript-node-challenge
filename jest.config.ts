import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  collectCoverage: true,
  moduleFileExtensions: ["ts", "js", "vue"],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  moduleNameMapper: {
    "@shared/(.*)": "<rootDir>/src/shared/$1",
    "@components/(.*)": "<rootDir>/src/app/components/$1",
    "@app/(.*)": "<rootDir>/src/app/$1"
 },
 globals: {
  API_URL: 'http://mock',
 }
};

export default config;
