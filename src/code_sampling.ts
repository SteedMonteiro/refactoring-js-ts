```typescript
import * as fs from 'fs';
import * as path from 'path';

// Define the directory of the codebase
const CODEBASE_DIR = './path_to_your_codebase';

// Define the sample size
const SAMPLE_SIZE = 10;

// Function to get all TypeScript files from a directory
function getTypescriptFiles(dir: string, fileList: string[]): string[] {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            fileList = getTypescriptFiles(path.join(dir, file), fileList);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            fileList.push(path.join(dir, file));
        }
    });

    return fileList;
}

// Function to sample code
function sampleCode() {
    const allFiles = getTypescriptFiles(CODEBASE_DIR, []);
    const sampleFiles = [];

    for (let i = 0; i < SAMPLE_SIZE; i++) {
        const randomIndex = Math.floor(Math.random() * allFiles.length);
        sampleFiles.push(allFiles[randomIndex]);
        allFiles.splice(randomIndex, 1);  // Remove the selected file from the list
    }

    return sampleFiles;
}

// Export the function for use in other modules
export { sampleCode };
```