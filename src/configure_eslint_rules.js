```javascript
const fs = require('fs');
const path = require('path');
const ESLint = require('eslint').ESLint;

const eslint = new ESLint({ fix: true });

const projectSpecifications = require('./project_specifications.js');

const configureESLintRules = async () => {
  const { maxLinesPerFile, maxCharactersPerLine } = projectSpecifications;

  const eslintConfig = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      '@typescript-eslint',
    ],
    rules: {
      'max-lines': ['error', maxLinesPerFile],
      'max-len': ['error', maxCharactersPerLine],
    },
  };

  fs.writeFileSync(path.join(__dirname, '.eslintrc.js'), `module.exports = ${JSON.stringify(eslintConfig, null, 2)}`);
};

configureESLintRules().catch((error) => {
  console.error(error);
});
```