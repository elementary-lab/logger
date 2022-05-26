module.exports = {
    env: {
        browser: false,
        es2021: true
    },
    extends: [
        'standard'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint'
    ],
    rules: {
        semi: [2, 'always'],
        indent: ['error', 4],
        'space-before-function-paren': ['error', {
            anonymous: 'never',
            named: 'never',
            asyncArrow: 'never'
        }],
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error']
    }
};
