import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { tsconfig: 'tsconfig.json' }   // путь к вашему tsconfig для тестов
        ]
    },
    // Если тесты лежат в src, указываем эту директорию
    roots: ['<rootDir>/src', '<rootDir>/test'], // добавляем test, если там лежат тесты
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // расширения модулей
    moduleDirectories: ['node_modules', 'src'],  // где искать модули

    // Маппинг алиасов из tsconfig.json
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    testMatch: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
};

export default config;
