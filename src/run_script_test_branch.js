const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { analyzeCodebase } = require('./source_code_analysis');
const { refactorCode } = require('./refactoring_implementation');

const runScriptOnTestBranch = async () => {
  // Create a new branch for testing
  exec('git checkout -b testBranch', (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });

  // Analyze the codebase and get the files that need refactoring
  const filesToRefactor = await analyzeCodebase();

  // Refactor the files
  for (let file of filesToRefactor) {
    const filePath = path.join(__dirname, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const refactoredContent = refactorCode(fileContent);
    fs.writeFileSync(filePath, refactoredContent);
  }

  // Commit the changes
  exec('git add . && git commit -m "Refactored code"', (error, stdout, stderr) => {
    if (error) {
      console.log(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
  });
};

runScriptOnTestBranch();