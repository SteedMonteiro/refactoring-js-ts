```typescript
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);

interface RefactoringCriteria {
  maxLinesPerFile: number;
  maxLinesPerFunction: number;
  maxCharactersPerLine: number;
}

const defaultCriteria: RefactoringCriteria = {
  maxLinesPerFile: 200,
  maxLinesPerFunction: 50,
  maxCharactersPerLine: 80,
};

async function initializeTool(criteria: RefactoringCriteria = defaultCriteria): Promise<void> {
  const configPath = path.join(__dirname, 'config.json');

  const config = {
    criteria,
  };

  await writeFileAsync(configPath, JSON.stringify(config, null, 2));
}

async function getRefactoringCriteria(): Promise<RefactoringCriteria> {
  const configPath = path.join(__dirname, 'config.json');
  const configContent = await readFileAsync(configPath, 'utf-8');

  const config = JSON.parse(configContent);
  return config.criteria;
}

export { initializeTool, getRefactoringCriteria, RefactoringCriteria };
```