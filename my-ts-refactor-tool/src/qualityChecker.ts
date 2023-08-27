```typescript
import { ESLint } from "eslint";

export class QualityChecker {
  private eslint: ESLint;

  constructor() {
    this.eslint = new ESLint({
      overrideConfigFile: "../config/eslint-config.json",
    });
  }

  public async checkCodeQuality(filePath: string): Promise<void> {
    const results = await this.eslint.lintFiles(filePath);

    ESLint.outputFixes(results);

    const formatter = await this.eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);

    console.log(resultText);
  }
}
```