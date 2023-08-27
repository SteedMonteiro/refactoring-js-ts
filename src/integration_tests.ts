```typescript
import { runScriptOnTestBranch } from './run_script_test_branch';
import { reviewCode } from './code_review';
import { automateRefactoring } from './automated_refactoring';

async function runIntegrationTests() {
    try {
        // Run the refactoring script on a test branch
        const testBranchResult = await runScriptOnTestBranch();
        if (!testBranchResult.success) {
            throw new Error('Failed to run script on test branch');
        }

        // Review the code after refactoring
        const reviewResult = await reviewCode();
        if (!reviewResult.success) {
            throw new Error('Failed to review code');
        }

        // Run the refactoring again to ensure it doesn't introduce any new issues
        const refactoringResult = await automateRefactoring();
        if (!refactoringResult.success) {
            throw new Error('Failed to refactor code');
        }

        console.log('Integration tests passed successfully');
    } catch (error) {
        console.error(`Integration tests failed: ${error.message}`);
    }
}

runIntegrationTests();
```