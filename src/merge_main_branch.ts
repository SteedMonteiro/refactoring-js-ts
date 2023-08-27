```typescript
import * as git from 'simple-git';
import { generateDocumentation } from './documentation';

const gitInstance = git();

async function mergeIntoMainBranch() {
    try {
        // Check the status of the repository
        const status = await gitInstance.status();

        // If there are changes, commit them
        if (status.modified.length > 0 || status.not_added.length > 0) {
            await gitInstance.add('./*');
            await gitInstance.commit('Automated refactoring changes');
        }

        // Merge the changes into the main branch
        await gitInstance.checkout('main');
        await gitInstance.merge(['--no-ff', 'refactoring-branch']);

        // Generate documentation
        await generateDocumentation();

        console.log('Successfully merged refactoring changes into the main branch.');
    } catch (error) {
        console.error('Error during merging into main branch:', error);
    }
}

export { mergeIntoMainBranch };
```