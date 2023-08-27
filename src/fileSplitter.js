const fs = require('fs');

function splitFile(filePath) {
    const MAX_LINES = 500;
    let fileContent = fs.readFileSync(filePath, 'utf8');
    let lines = fileContent.split('\n');

    let fileCount = Math.ceil(lines.length / MAX_LINES);
    for (let i = 0; i < fileCount; i++) {
        let start = i * MAX_LINES;
        let end = start + MAX_LINES;
        let fileLines = lines.slice(start, end);
        let newFilePath = filePath.replace('.js', `_${i}.js`);
        fs.writeFileSync(newFilePath, fileLines.join('\n'), 'utf8');
    }
}

module.exports = {
    splitFile
};