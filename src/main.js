const refactor = require('./refactorTool');
const fileHandler = require('./fileHandler');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path as an argument.');
  process.exit(1);
}

const fileContent = fileHandler.readFile(filePath);

if (!fileContent) {
  console.error('File not found or is empty.');
  process.exit(1);
}

const refactoredFiles = refactor(fileContent, 500);

if (!refactoredFiles || refactoredFiles.length === 0) {
  console.error('Refactoring failed or the file was already within the line limit.');
  process.exit(1);
}

refactoredFiles.forEach((file, index) => {
  fileHandler.writeFile(`${filePath.split('.')[0]}_${index}.${filePath.split('.')[1]}`, file);
});

console.log('Refactoring completed successfully.');