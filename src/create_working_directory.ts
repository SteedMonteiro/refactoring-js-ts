```typescript
import * as fs from 'fs';
import * as path from 'path';

const workingDirectory = path.join(__dirname, 'refactoring_workspace');

function createWorkingDirectory() {
    if (!fs.existsSync(workingDirectory)) {
        fs.mkdirSync(workingDirectory, { recursive: true });
        console.log(`Working directory created at: ${workingDirectory}`);
    } else {
        console.log(`Working directory already exists at: ${workingDirectory}`);
    }
}

export default createWorkingDirectory;
```