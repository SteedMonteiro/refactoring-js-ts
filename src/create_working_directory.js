const fs = require('fs');
const path = require('path');

const workingDirectory = path.join(__dirname, 'refactoring_workspace');

if (!fs.existsSync(workingDirectory)) {
    fs.mkdirSync(workingDirectory);
    console.log(`Working directory ${workingDirectory} created.`);
} else {
    console.log(`Working directory ${workingDirectory} already exists.`);
}