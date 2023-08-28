
/**
 * This module is responsible for generating documentation for the refactoring process.
 * It details the changes made, the reasons for each change, and guidelines for future refactoring.
 */

const fs = require('fs');
const path = require('path');

const changesLogPath = path.join(__dirname, '../logs/changes.log');
const reasonsLogPath = path.join(__dirname, '../logs/reasons.log');
const guidelinesPath = path.join(__dirname, '../guidelines.md');

/**
 * Function to update the documentation.
 */
function updateDocumentation() {
    const changesLog = fs.readFileSync(changesLogPath, 'utf-8');
    const reasonsLog = fs.readFileSync(reasonsLogPath, 'utf-8');
    const guidelines = fs.readFileSync(guidelinesPath, 'utf-8');

    const documentation = `
# Refactoring Documentation

## Changes Made

${changesLog}

## Reasons for Changes

${reasonsLog}

## Guidelines for Future Refactoring

${guidelines}
    `;

    fs.writeFileSync(path.join(__dirname, 'documentation.md'), documentation);
}

module.exports = {
    updateDocumentation
};
