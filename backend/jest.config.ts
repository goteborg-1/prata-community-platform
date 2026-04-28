import type { Config } from "jest"

const config: Config = {                                                                                                                                                                                                                    
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // if jest sees import with .js, remove and search without file ending (since we mostly use .ts etc)
  },
}

export default config