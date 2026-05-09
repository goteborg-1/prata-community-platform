import type { Config } from "jest"

const config: Config = {                                                                                                                                                                                                                    
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // if jest sees import with .js, remove and search without file ending (since we mostly use .ts etc)
    '^@shared$': '<rootDir>/../shared/index.ts', // so jest finds @shared
  },
  testPathIgnorePatterns: ['/node_modules/', '/__tests__/helpers/'],
}

export default config