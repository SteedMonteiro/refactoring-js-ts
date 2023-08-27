```typescript
// src/evaluate_technologies.ts

import * as jscodeshift from 'jscodeshift';
import * as ESLint from 'eslint';
import * as Babel from '@babel/core';

function evaluateTechnologies() {
    try {
        console.log('Evaluating technologies for AST manipulation and code quality checks...');

        // Check if jscodeshift is available
        if (jscodeshift) {
            console.log('jscodeshift is available for AST manipulation.');
        } else {
            console.log('jscodeshift is not available.');
        }

        // Check if ESLint is available
        if (ESLint) {
            console.log('ESLint is available for code quality checks.');
        } else {
            console.log('ESLint is not available.');
        }

        // Check if Babel is available
        if (Babel) {
            console.log('Babel is available for AST manipulation.');
        } else {
            console.log('Babel is not available.');
        }

        console.log('Evaluation of technologies completed.');
    } catch (error) {
        console.error('Error during evaluation of technologies:', error);
    }
}

evaluateTechnologies();
```