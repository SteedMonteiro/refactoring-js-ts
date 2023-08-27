```typescript
import { ESLint } from "eslint";

export async function checkCodeQuality() {
  const eslint = new ESLint({ fix: true });

  const results = await eslint.lintFiles(["src/**/*.ts"]);

  await ESLint.outputFixes(results);

  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  if (resultText) {
    console.error(resultText);
  }

  const errorCount = results.reduce((acc, result) => acc + result.errorCount, 0);

  if (errorCount > 0) {
    throw new Error(`ESLint check failed with ${errorCount} errors`);
  }
}
```