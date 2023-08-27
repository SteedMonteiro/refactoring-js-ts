const { splitFile } = require('../src/fileSplitter');
const { readFile } = require('../src/fileHandler');

describe('File Splitter', () => {
  test('should split file into multiple files with maximum 500 lines each', async () => {
    const filePath = './testFile.txt';
    const fileContent = await readFile(filePath);
    const lines = fileContent.split('\n');
    const expectedFilesCount = Math.ceil(lines.length / 500);

    await splitFile(filePath);

    const splittedFiles = await Promise.all(
      Array.from({ length: expectedFilesCount }, (_, i) => readFile(`./${filePath}_${i}`))
    );

    const totalLinesInSplittedFiles = splittedFiles.reduce((total, fileContent) => {
      return total + fileContent.split('\n').length;
    }, 0);

    expect(totalLinesInSplittedFiles).toBe(lines.length);
  });
});