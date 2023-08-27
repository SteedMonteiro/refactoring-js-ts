import * as fs from 'fs';
import * as path from 'path';
import jscodeshift, { Collection } from 'jscodeshift';



export class Analyzer {
  private rootDir: string;
  private refactorStrategies: any[] = [];

  constructor(rootDir: string) {
    this.rootDir = rootDir;
  }


  /**
   * Analyzes TypeScript files in the given directory.
   */
  public analyze(): void {
    try {
      const files = this.getTSFiles(this.rootDir);
      files.forEach((file) => {
        const source = fs.readFileSync(file, 'utf8');
        const ast = jscodeshift(source);
        this.analyzeAST(ast, file);
      });
    } catch (error) {
      console.error(`An error occurred while analyzing: ${error.message}`);
    }
  }

   /**
   * Recursively fetches all TypeScript files in a given directory.
   * @param dir - The directory to search in.
   * @returns An array of paths to TypeScript files.
   */

  private getTSFiles(dir: string): string[] {
    let results: string[] = [];
    const list = fs.readdirSync(dir);
    list.forEach((file) => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(this.getTSFiles(file));
      } else if (path.extname(file) === '.ts') {
        results.push(file);
      }
    });
    return results;
  }

   /**
   * Analyzes the AST of a given file.
   * @param ast - The abstract syntax tree.
   * @param file - The path to the file.
   */
   private analyzeAST(ast: Collection<any>, file: string): void {
    // Count lines in the entire file
    const linesInFile = ast.toSource().split('\n').length;
    if (linesInFile > 100) {
      this.refactorStrategies.push({
        filePath: file,
        action: 'splitFile',
        reason: 'File has more than 100 lines'
      });
    }
  
    // Check for functions that have too many lines
    ast.find(jscodeshift.FunctionDeclaration)
      .forEach(path => {
        const functionSource = jscodeshift(path).toSource();
        const linesInFunction = functionSource.split('\n').length;
        const functionName = path.value.id?.name || 'anonymous';
  
        if (linesInFunction > 20) { // Replace 20 with your own threshold
          this.refactorStrategies.push({
            filePath: file,
            action: 'splitFunction',
            target: functionName,
            reason: 'Function has more than 20 lines'
          });
        }
      });
  
    // Check for classes with too many methods
    ast.find(jscodeshift.ClassDeclaration)
      .forEach(path => {
        const methods = path.value.body.body;
        const className = path.value.id?.name || 'UnnamedClass';
  
        if (methods.length > 5) {  // Replace 5 with your own threshold
          this.refactorStrategies.push({
            filePath: file,
            action: 'refactorClass',
            target: className,
            reason: 'Class has more than 5 methods'
          });
        }
      });


      ast.find(jscodeshift.ClassDeclaration, {
        superClass: { name: 'Component' },
      }).forEach((path) => {
        const classDeclaration = path.value;
        const className = classDeclaration.id.name;
  
        this.refactorStrategies.push({
          filePath: file,
          action: 'refactorReactClass',
          target: className,
          reason: 'React class component should be refactored to a functional component.',
        });
      });
  
    // Add more checks as needed
  }
  
}

// Example usage
// const rootDirectory = './src'; // Replace with the path to your TypeScript root directory
// const analyzer = new Analyzer(rootDirectory);
// analyzer.analyze();
