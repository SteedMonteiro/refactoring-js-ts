```javascript
const assert = require('assert');
const { analyzeCodebase, refactorCode } = require('../src/source_code_analysis.js');
const { detectLargeComponents } = require('../src/detection_large_functions_components.js');

describe('Integration Tests', function() {
  it('should refactor the codebase correctly', async function() {
    // Analyze the codebase
    const analysisResult = await analyzeCodebase();

    // Detect large components
    const largeComponents = detectLargeComponents(analysisResult);

    // Refactor the code
    const refactoredCode = refactorCode(largeComponents);

    // Assert that the refactored code meets the criteria
    assert(refactoredCode.every(file => file.lines.length <= projectSpecifications.maxLinesPerFile));
    assert(refactoredCode.every(file => file.functions.every(func => func.lines.length <= projectSpecifications.maxLinesPerFunction)));
  });
});
```