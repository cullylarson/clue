module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json'],
    },
    plugins: [
        '@typescript-eslint',
        'jest',
    ],
    extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    env: {
        'jest/globals': true,
    },
    rules: {
        // some default result conflict with typescript rules
        'comma-dangle': 'off',
        'semi': 'off',
        'indent': 'off',
        'keyword-spacing': 'off',
        'brace-style': 'off',

        // rules
        'max-len': 'off',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/brace-style': ['error', 'stroustrup'],
        '@typescript-eslint/keyword-spacing': ['error', {
            'before': true,
            'after': true,
            'overrides': {
                'if': {'after': false},
                'while': {'after': false},
                'for': {'after': false},
            },
        }],
        'no-else-return': 'off',
        '@typescript-eslint/semi': ['error', 'never'],
        '@typescript-eslint/indent': ['error', 4, {'SwitchCase': 1}],
        'space-before-function-paren': ['error', 'never'],
        'keyword-spacing': 'off',
        'brace-style': ['error', 'stroustrup', {'allowSingleLine': true}],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'operator-linebreak': ['error', 'before'],
        'object-curly-spacing': ['error', 'never'],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always',
        }],
    },
}
