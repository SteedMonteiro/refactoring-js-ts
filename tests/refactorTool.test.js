const { refactor } = require('../src/refactorTool');
const { readFile } = require('../src/fileHandler');
const path = require('path');

describe('Refactor Tool', () => {
  it('should split a file into multiple files with a maximum of 500 lines each', async () => {
    const filePath = path.join(__dirname, 'testFile.js');
    const fileContent = await readFile(filePath);
    const lineCountBefore = fileContent.split('\n').length;

    await refactor(filePath);

    const refactoredFiles = [
      path.join(__dirname, 'testFile_1.js'),
      path.join(__dirname, 'testFile_2.js'),
      // Add more files as needed
    ];

    let lineCountAfter = 0;
    for (const file of refactoredFiles) {
      const content = await readFile(file);
      lineCountAfter += content.split('\n').length;
    }

    expect(lineCountBefore).toEqual(lineCountAfter);
  });

  it('should not create a file with more than 500 lines', async () => {
    const filePath = path.join(__dirname, 'testFile.js');
    await refactor(filePath);

    const refactoredFiles = [
      path.join(__dirname, 'testFile_1.js'),
      path.join(__dirname, 'testFile_2.js'),
      // Add more files as needed
    ];

    for (const file of refactoredFiles) {
      const content = await readFile(file);
      expect(content.split('\n').length).toBeLessThanOrEqual(500);
    }
  });
});