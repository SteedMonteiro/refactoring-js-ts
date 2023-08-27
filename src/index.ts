import { Analyzer } from './analyzer';
import { Refactorer } from './refactorer';  // Assuming that you have a class Refactorer in a file called 'refactorer.ts'
import { QualityChecker } from './qualityChecker';
import { Documenter } from './documenter';
import { runTests } from './tester';

const args = process.argv.slice(2);

function main() {
  const rootDirectory = './src'; // Replace with the path to your TypeScript root directory

  if (args.includes('--analyze')) {
    const analyzer = new Analyzer(rootDirectory);
    analyzer.analyze();
  }

  if (args.includes('--refactor')) {
    const refactorer = new Refactorer(rootDirectory);  // Assuming that Refactorer takes rootDirectory as a parameter
    refactorer.refactor();
  }

  if (args.includes('--lint')) {
    const qualityChecker = new QualityChecker();
    qualityChecker.checkCodeQuality(rootDirectory);  // Assuming that checkCodeQuality takes rootDirectory as a parameter
  }

  if (args.includes('--test')) {
    runTests();
  }

  if (args.includes('--document')) {
    const documenter = new Documenter();
    documenter.generateDocumentation([]); // Replace with the actual data you want to document
  }
}

main();
