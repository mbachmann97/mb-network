module.exports = {
    root: true,
    env: {
        node: true
    },
    "parserOptions": {
        "sourceType": "module",
        "ecmaFeatures": {
        "jsx": true
        }
    },
    'extends': [
        'eslint:recommended'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
}