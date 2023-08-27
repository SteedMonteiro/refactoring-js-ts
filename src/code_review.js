```javascript
const fs = require('fs');
const path = require('path');
const { ESLint } = require('eslint');

const eslint = new ESLint();

async function reviewCode() {
  const files = fs.readdirSync(path.join(__dirname, '../'));
  const jsFiles = files.filter(file => file.endsWith('.js'));

  for (const file of jsFiles) {
    const results = await eslint.lintFiles(file);
    ESLint.outputFixes(results);

    const formatter = await eslint.loadFormatter('stylish');
    const resultText = formatter.format(results);

    if (resultText) {
      console.log(`ESLint results for ${file}:\n`, resultText);
    }
  }
}

reviewCode().catch((error) => {
  process.exitCode = 1;
  console.error(error);
});
```