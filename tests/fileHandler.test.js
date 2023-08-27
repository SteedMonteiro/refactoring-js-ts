const fs = require('fs');
const { readFile, writeFile } = require('../src/fileHandler.js');

jest.mock('fs');

describe('fileHandler', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('readFile', () => {
    it('should read a file correctly', async () => {
      const mockFileContent = 'This is a test file content';
      fs.readFileSync.mockReturnValue(mockFileContent);

      const fileContent = readFile('test.txt');

      expect(fs.readFileSync).toHaveBeenCalledWith('test.txt', 'utf-8');
      expect(fileContent).toBe(mockFileContent);
    });

    it('should throw an error if the file does not exist', () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error('File not found');
      });

      expect(() => readFile('nonexistent.txt')).toThrow('File not found');
    });
  });

  describe('writeFile', () => {
    it('should write to a file correctly', () => {
      const mockFileContent = 'This is a test file content';

      writeFile('test.txt', mockFileContent);

      expect(fs.writeFileSync).toHaveBeenCalledWith('test.txt', mockFileContent, 'utf-8');
    });

    it('should throw an error if the file cannot be written', () => {
      fs.writeFileSync.mockImplementation(() => {
        throw new Error('Cannot write to file');
      });

      expect(() => writeFile('nonexistent.txt', 'test content')).toThrow('Cannot write to file');
    });
  });
});