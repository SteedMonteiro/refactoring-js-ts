```typescript
import fs from 'fs';
import path from 'path';

interface DocumentationContent {
    changesMade: string[];
    reasonsForChange: string[];
    futureRefactoringGuidelines: string[];
}

const documentationContent: DocumentationContent = {
    changesMade: [],
    reasonsForChange: [],
    futureRefactoringGuidelines: [],
};

export function generateDocumentation() {
    const documentationPath = path.join(__dirname, '../documentation.md');

    let documentation = '# Refactoring Documentation\n\n';

    documentation += '## Changes Made\n\n';
    documentationContent.changesMade.forEach((change, index) => {
        documentation += `${index + 1}. ${change}\n`;
    });

    documentation += '\n## Reasons for Changes\n\n';
    documentationContent.reasonsForChange.forEach((reason, index) => {
        documentation += `${index + 1}. ${reason}\n`;
    });

    documentation += '\n## Guidelines for Future Refactoring\n\n';
    documentationContent.futureRefactoringGuidelines.forEach((guideline, index) => {
        documentation += `${index + 1}. ${guideline}\n`;
    });

    fs.writeFileSync(documentationPath, documentation);
}

export function addChange(change: string) {
    documentationContent.changesMade.push(change);
}

export function addReason(reason: string) {
    documentationContent.reasonsForChange.push(reason);
}

export function addFutureRefactoringGuideline(guideline: string) {
    documentationContent.futureRefactoringGuidelines.push(guideline);
}
```