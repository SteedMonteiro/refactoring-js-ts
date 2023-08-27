const jscodeshift = require('jscodeshift');
const fs = require('fs');
const path = require('path');

const projectSpecifications = require('./project_specifications.js');

function detectLargeComponents(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = jscodeshift(code);

  ast.find(jscodeshift.FunctionDeclaration)
    .forEach(path => {
      const functionDeclaration = path.value;
      const functionBody = functionDeclaration.body.body;
      if (functionBody.length > projectSpecifications.maxLinesPerFunction) {
        console.log(`Function ${functionDeclaration.id.name} in file ${filePath} exceeds the maximum line limit.`);
      }
    });

  ast.find(jscodeshift.VariableDeclaration)
    .forEach(path => {
      const variableDeclaration = path.value;
      const declarations = variableDeclaration.declarations;
      declarations.forEach(declaration => {
        if (declaration.init && declaration.init.type === 'ArrowFunctionExpression') {
          const functionBody = declaration.init.body.body;
          if (functionBody.length > projectSpecifications.maxLinesPerFunction) {
            console.log(`Arrow function in variable ${declaration.id.name} in file ${filePath} exceeds the maximum line limit.`);
          }
        }
      });
    });
}

function traverseDirectory(directoryPath) {
  fs.readdirSync(directoryPath).forEach(file => {
    const absolutePath = path.join(directoryPath, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      traverseDirectory(absolutePath);
    } else if (absolutePath.endsWith('.js') || absolutePath.endsWith('.ts')) {
      detectLargeComponents(absolutePath);
    }
  });
}

traverseDirectory(projectSpecifications.codebasePath);