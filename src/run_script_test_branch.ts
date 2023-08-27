```typescript
import { analyzeSourceCode } from './analyze_source_code';
import { automateRefactoring } from './automated_refactoring';
import { checkCodeQuality } from './code_quality_checks';
import { writeUnitTests } from './testing_support';

async function runScriptOnTestBranch() {
    // Analyze the source code
    const codebaseState = await analyzeSourceCode();

    // Perform automated refactoring
    const refactoringChanges = await automateRefactoring(codebaseState);

    // Check the quality of the refactored code
    const qualityCheckResult = await checkCodeQuality(refactoringChanges);

    // If the quality check fails, throw an error
    if (!qualityCheckResult) {
        throw new Error('Quality check failed for the refactored code.');
    }

    // Write unit tests to verify the refactoring logic
    const unitTestResult = await writeUnitTests(refactoringChanges);

    // If the unit tests fail, throw an error
    if (!unitTestResult) {
        throw new Error('Unit tests failed for the refactoring logic.');
    }

    // If everything passes, return the refactoring changes
    return refactoringChanges;
}

export { runScriptOnTestBranch };
```