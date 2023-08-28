const { exec } = require('child_process');

// Function to install Node.js
function installNode() {
  exec('curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Function to install jscodeshift
function installJscodeshift() {
  exec('npm install -g jscodeshift', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Function to install ESLint
function installEslint() {
  exec('npm install eslint --save-dev', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

// Execute the installation functions
installNode();
installJscodeshift();
installEslint();