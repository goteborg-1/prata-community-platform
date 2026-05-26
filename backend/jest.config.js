const config = {
    preset: "ts-jest/presets/default-esm",
    testEnvironment: "node",
    extensionsToTreatAsEsm: [".ts"],
    moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1", // if jest sees import with .js, remove and search without file ending (since we mostly use .ts etc)
        "^@prata/shared$": "<rootDir>/../shared/index.ts", // so jest finds @prata/shared
    },
    testPathIgnorePatterns: ["/node_modules/", "/__tests__/helpers/"],
};

export default config;
