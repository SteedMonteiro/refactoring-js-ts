```typescript
import fs from 'fs';
import path from 'path';
import { RefactoringCriteria } from './project_specifications';

export class MaintenanceMode {
    private criteriaFilePath: string;

    constructor() {
        this.criteriaFilePath = path.join(__dirname, 'project_specifications.ts');
    }

    updateRefactoringLogic(newCriteria: RefactoringCriteria): void {
        fs.writeFileSync(this.criteriaFilePath, `export const refactoringCriteria = ${JSON.stringify(newCriteria, null, 2)}`);
        console.log('Refactoring logic updated successfully.');
    }
}
```