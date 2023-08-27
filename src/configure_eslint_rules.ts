```typescript
import { CLIEngine } from "eslint";

function configureESLintRules() {
    const cli = new CLIEngine({
        useEslintrc: false,
        rules: {
            'max-lines': ['error', { max: 200, skipBlankLines: true, skipComments: true }],
            'max-len': ['error', { code: 80 }],
            'no-unused-vars': 'error',
            'no-undef': 'error',
        },
        parserOptions: {
            ecmaVersion: 2018,
            sourceType: 'module',
        },
    });

    const report = cli.executeOnFiles(['./src/**/*.ts']);

    const formatter = cli.getFormatter();

    console.log(formatter(report.results));
}

configureESLintRules();
```