const { countLines } = require('../src/lineCounter.js');
const { readFile } = require('../src/fileHandler.js');

describe('Line Counter', () => {
  test('counts lines correctly', async () => {
    const fileContent = await readFile('testFile.txt');
    const lineCount = countLines(fileContent);
    expect(lineCount).toBe(500);
  });

  test('throws error on invalid file', async () => {
    await expect(readFile('invalidFile.txt')).rejects.toThrow('fileNotFound');
  });
});