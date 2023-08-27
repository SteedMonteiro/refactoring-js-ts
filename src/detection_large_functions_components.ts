```typescript
import * as fs from 'fs';
import * as path from 'path';
import * as jscodeshift from 'jscodeshift';
import { Collection } from 'jscodeshift/src/Collection';
import { File } from 'jscodeshift/src/core';
import { ProjectSpecifications } from './project_specifications';

export class LargeComponentDetector {
  private projectSpecifications: ProjectSpecifications;

  constructor(projectSpecifications: ProjectSpecifications) {
    this.projectSpecifications = projectSpecifications;
  }

  public detectLargeFunctionsAndComponents(directory: string): void {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.join(directory, file);
      if (fs.lstatSync(fullPath).isDirectory()) {
        this.detectLargeFunctionsAndComponents(fullPath);
      } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        const sourceCode = fs.readFileSync(fullPath, 'utf8');
        const root = jscodeshift(sourceCode);
        this.detectLargeFunctions(root, fullPath);
        this.detectLargeComponents(root, fullPath);
      }
    });
  }

  private detectLargeFunctions(root: Collection<File>, filePath: string): void {
    root.find(jscodeshift.FunctionDeclaration)
      .forEach((path) => {
        const functionLines = path.node.loc?.end.line - path.node.loc?.start.line;
        if (functionLines && functionLines > this.projectSpecifications.maxFunctionLines) {
          console.log(`Large function detected in ${filePath} at line ${path.node.loc?.start.line}`);
        }
      });
  }

  private detectLargeComponents(root: Collection<File>, filePath: string): void {
    root.findJSXElements()
      .forEach((path) => {
        const componentLines = path.node.loc?.end.line - path.node.loc?.start.line;
        if (componentLines && componentLines > this.projectSpecifications.maxComponentLines) {
          console.log(`Large component detected in ${filePath} at line ${path.node.loc?.start.line}`);
        }
      });
  }
}
```