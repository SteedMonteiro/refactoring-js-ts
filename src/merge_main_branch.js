```javascript
const { exec } = require('child_process');

function mergeIntoMainBranch() {
    exec('git checkout main', (error, stdout, stderr) => {
        if (error) {
            console.log(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`Stderr: ${stderr}`);
            return;
        }
        console.log(`Stdout: ${stdout}`);

        exec('git merge test-branch', (mergeError, mergeStdout, mergeStderr) => {
            if (mergeError) {
                console.log(`Merge Error: ${mergeError.message}`);
                return;
            }
            if (mergeStderr) {
                console.log(`Merge Stderr: ${mergeStderr}`);
                return;
            }
            console.log(`Merge Stdout: ${mergeStdout}`);
        });
    });
}

mergeIntoMainBranch();
```