// module.exports = {
//   env: {
//     es6: true,
//     node: true
//   },
//   extends: ['eslint:recommended', 'plugin:@typescript-eslint/eslint-recommended'],
//   globals: {
//     Atomics: 'readonly',
//     SharedArrayBuffer: 'readonly'
//   },
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 2018,
//     sourceType: 'module'
//   },
//   plugins: ['@typescript-eslint'],
//   rules: {
//     semi: ['error', 'never'],
//     quotes: ['error', 'single']
//   }
// }

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'plugin:@typescript-eslint/recommended' // Uses the recommended rules from the @typescript-eslint/eslint-plugin
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
  }
}
