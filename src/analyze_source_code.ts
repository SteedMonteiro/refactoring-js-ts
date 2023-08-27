```typescript
import * as fs from 'fs';
import * as path from 'path';
import { Collection } from 'jscodeshift';
import jscodeshift from 'jscodeshift';

interface FileData {
  filePath: string;
  functionCount: number;
  lineCount: number;
}

const MAX_LINES_PER_FILE = 200; // This should be defined in project specifications
const MAX_LINES_PER_FUNCTION = 50; // This should be defined in project specifications

function analyzeSourceCode(directory: string): FileData[] {
  const filesData: FileData[] = [];

  fs.readdirSync(directory).forEach((file) => {
    const filePath = path.join(directory, file);

    if (fs.statSync(filePath).isDirectory()) {
      filesData.push(...analyzeSourceCode(filePath));
    } else if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const root = jscodeshift(fileContent);

      const functionCount = countFunctions(root);
      const lineCount = countLines(fileContent);

      if (lineCount > MAX_LINES_PER_FILE || functionCount > MAX_LINES_PER_FUNCTION) {
        filesData.push({
          filePath,
          functionCount,
          lineCount,
        });
      }
    }
  });

  return filesData;
}

function countFunctions(root: Collection<any>): number {
  return root.find(jscodeshift.FunctionDeclaration).size();
}

function countLines(fileContent: string): number {
  return fileContent.split('\n').length;
}

export default analyzeSourceCode;
```