
import { ESLint } from "eslint";
import * as fs from 'fs';

export class QualityChecker {
  private eslint: ESLint;

  constructor() {
    if (!fs.existsSync('../config/eslint-config.json')) {
      console.error("ESLint config file does not exist.");
      process.exit(1);
    }
    
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
