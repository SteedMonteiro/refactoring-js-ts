
const jscodeshift = require('jscodeshift');
const fs = require('fs');
const path = require('path');
const { projectSpecifications } = require('./project_specifications.js');
const { detectLargeComponents } = require('./detection_large_functions_components.js');

function refactorCode(filePath) {
    const sourceCode = fs.readFileSync(filePath, 'utf8');
    const ast = jscodeshift(sourceCode);

    detectLargeComponents(ast).forEach(component => {
        if (component.size > projectSpecifications.maxLinesPerComponent) {
            splitComponent(component);
        }
    });

    fs.writeFileSync(filePath, ast.toSource(), 'utf8');
}

function splitComponent(component) {
    const newComponents = [];
    let currentComponent = [];

    component.body.forEach((line, index) => {
        currentComponent.push(line);

        if (currentComponent.length === projectSpecifications.maxLinesPerComponent || index === component.body.length - 1) {
            newComponents.push(currentComponent);
            currentComponent = [];
        }
    });

    component.replaceWith(newComponents.map((newComponentBody, index) => {
        return jscodeshift.functionDeclaration(
            jscodeshift.identifier(`${component.name}_${index}`),
            component.params,
            jscodeshift.blockStatement(newComponentBody)
        );
    }));
}

module.exports = {
    refactorCode
};
