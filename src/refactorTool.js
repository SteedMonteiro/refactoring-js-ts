const fs = require('fs');
const path = require('path');
const { countLines } = require('./lineCounter');
const { splitFile } = require('./fileSplitter');
const { readFile, writeFile } = require('./fileHandler');

const MAX_LINES = 500;

async function refactor(filePath) {
    try {
        const fileContent = await readFile(filePath);
        const linesCount = countLines(fileContent);

        if (linesCount <= MAX_LINES) {
            console.log('No refactoring needed.');
            return;
        }

        const newFiles = splitFile(fileContent, MAX_LINES);
        const originalFileName = path.basename(filePath, path.extname(filePath));

        newFiles.forEach((content, index) => {
            const newFilePath = path.join(path.dirname(filePath), `${originalFileName}_${index + 1}.js`);
            writeFile(newFilePath, content);
        });

        fs.unlinkSync(filePath);
        console.log('Refactoring completed successfully.');
    } catch (error) {
        console.error('An error occurred during refactoring:', error);
    }
}

module.exports = {
    refactor
};