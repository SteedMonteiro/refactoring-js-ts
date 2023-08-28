
const fs = require('fs');
const path = require('path');
const jscodeshift = require('jscodeshift');

const projectSpecifications = require('./project_specifications.js');

function analyzeCodebase(directoryPath) {
    fs.readdirSync(directoryPath).forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            analyzeCodebase(filePath);
        } else if (stats.isFile() && path.extname(file) === '.js') {
            analyzeFile(filePath);
        }
    });
}

function analyzeFile(filePath) {
    const code = fs.readFileSync(filePath, 'utf8');
    const ast = jscodeshift(code);

    ast.find(jscodeshift.FunctionDeclaration).forEach(path => {
        const functionDeclaration = path.value;
        const linesOfCode = functionDeclaration.loc.end.line - functionDeclaration.loc.start.line;

        if (linesOfCode > projectSpecifications.maxLinesPerFunction) {
            console.log(`Function ${functionDeclaration.id.name} in file ${filePath} exceeds the maximum lines of code per function.`);
        }
    });

    const linesOfCodeInFile = code.split('\n').length;
    if (linesOfCodeInFile > projectSpecifications.maxLinesPerFile) {
        console.log(`File ${filePath} exceeds the maximum lines of code per file.`);
    }
}

module.exports = {
    analyzeCodebase
};
