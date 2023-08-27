```typescript
import { describe, it } from 'mocha';
import { expect } from 'chai';
import { analyzeSourceCode } from './analyze_source_code';
import { automateRefactoring } from './automated_refactoring';
import { checkCodeQuality } from './code_quality_checks';
import { initializeTool } from './initialize';
import { executeTool } from './execute';

describe('Refactoring Tool', () => {
  it('should initialize with project-specific criteria and rules', () => {
    const config = initializeTool();
    expect(config).to.have.property('maxLinesPerFile');
    expect(config).to.have.property('maxCharactersPerLine');
  });

  it('should analyze the source code and identify files that need refactoring', () => {
    const filesToRefactor = analyzeSourceCode();
    expect(filesToRefactor).to.be.an('array');
  });

  it('should automate the refactoring process', () => {
    const refactoredFiles = automateRefactoring();
    expect(refactoredFiles).to.be.an('array');
  });

  it('should check the quality of the refactored code', () => {
    const qualityCheckResult = checkCodeQuality();
    expect(qualityCheckResult).to.be.true;
  });

  it('should execute the tool and return the refactored codebase', () => {
    const refactoredCodebase = executeTool();
    expect(refactoredCodebase).to.be.an('object');
  });
});
```