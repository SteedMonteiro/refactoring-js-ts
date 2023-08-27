const fs = require('fs');

/**
 * Count the number of lines in a file
 * @param {string} filePath - The path to the file
 * @returns {Promise<number>} A promise that resolves with the number of lines
 */
function countLines(filePath) {
    return new Promise((resolve, reject) => {
        let lineCount = 0;
        fs.createReadStream(filePath)
            .on('data', (buffer) => {
                let idx = -1;
                lineCount--; // Because the loop will run once for idx=-1
                do {
                    idx = buffer.indexOf(10, idx+1);
                    lineCount++;
                } while (idx !== -1);
            }).on('end', () => {
                resolve(lineCount);
            }).on('error', reject);
    });
}

module.exports = {
    countLines
};