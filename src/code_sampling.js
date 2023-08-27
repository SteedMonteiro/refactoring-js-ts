```javascript
const fs = require('fs');
const path = require('path');

// Define the directory of the codebase
const codebaseDirectory = path.join(__dirname, '../codebase');

// Function to read all files in a directory
function readFiles(directory) {
    const files = fs.readdirSync(directory);
    return files.map(file => path.join(directory, file));
}

// Function to sample code from a file
function sampleCode(file) {
    const code = fs.readFileSync(file, 'utf-8');
    console.log(`Code from file ${file}:\n${code}\n`);
}

// Function to sample code from the codebase
function sampleCodebase() {
    const files = readFiles(codebaseDirectory);
    files.forEach(file => sampleCode(file));
}

// Run the code sampling
sampleCodebase();
```