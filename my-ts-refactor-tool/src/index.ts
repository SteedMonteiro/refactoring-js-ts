```typescript
import { analyze } from './analyzer';
import { refactor } from './refactorer';
import { checkQuality } from './qualityChecker';
import { test } from './tester';
import { document } from './documenter';

const args = process.argv.slice(2);

function main() {
  if (args.includes('--analyze')) {
    analyze();
  }

  if (args.includes('--refactor')) {
    refactor();
  }

  if (args.includes('--lint')) {
    checkQuality();
  }

  if (args.includes('--test')) {
    test();
  }

  if (args.includes('--document')) {
    document();
  }
}

main();
```