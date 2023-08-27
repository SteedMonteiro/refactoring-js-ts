```typescript
import * as jest from 'jest';
import { analyze } from './analyzer';
import { refactor } from './refactorer';
import { checkQuality } from './qualityChecker';
import { documentChanges } from './documenter';

export function runTests() {
  // Test the analyzer
  const analysisResult = analyze();
  if (!analysisResult) {
    console.error('Analyzer test failed');
    return;
  }

  // Test the refactorer
  const refactoringResult = refactor();
  if (!refactoringResult) {
    console.error('Refactorer test failed');
    return;
  }

  // Test the quality checker
  const qualityCheckResult = checkQuality();
  if (!qualityCheckResult) {
    console.error('Quality checker test failed');
    return;
  }

  // Test the documenter
  const documentationResult = documentChanges();
  if (!documentationResult) {
    console.error('Documenter test failed');
    return;
  }

  console.log('All tests passed');
}

// Run the tests when this module is invoked directly
if (require.main === module) {
  runTests();
}
```