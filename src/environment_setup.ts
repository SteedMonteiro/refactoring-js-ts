```typescript
import * as fs from 'fs';
import * as child_process from 'child_process';

function setupEnvironment() {
    // Check if Node.js is installed
    try {
        child_process.execSync('node -v', { stdio: 'ignore' });
        console.log('Node.js is installed.');
    } catch (error) {
        console.error('Node.js is not installed. Please install Node.js before proceeding.');
        process.exit(1);
    }

    // Check if jscodeshift is installed
    try {
        child_process.execSync('npx jscodeshift -v', { stdio: 'ignore' });
        console.log('jscodeshift is installed.');
    } catch (error) {
        console.error('jscodeshift is not installed. Installing jscodeshift...');
        child_process.execSync('npm install -g jscodeshift', { stdio: 'inherit' });
    }

    // Check if ESLint is installed
    try {
        child_process.execSync('npx eslint -v', { stdio: 'ignore' });
        console.log('ESLint is installed.');
    } catch (error) {
        console.error('ESLint is not installed. Installing ESLint...');
        child_process.execSync('npm install -g eslint', { stdio: 'inherit' });
    }

    // Create a working directory for the refactoring script
    if (!fs.existsSync('./refactoring_script')) {
        fs.mkdirSync('./refactoring_script');
        console.log('Created a working directory for the refactoring script.');
    } else {
        console.log('The working directory for the refactoring script already exists.');
    }
}

setupEnvironment();
```