# my-ts-refactor-tool

Automated TypeScript refactoring tool.

## Getting Started

### Installation

```bash
git clone https://github.com/yourusername/my-ts-refactor-tool.git
cd my-ts-refactor-tool
npm install
```

### Configuration

- Edit the `config/eslint-config.json` to customize ESLint rules.

### Usage

```bash
npm start -- [options]
```

- **Options**: 

  - `--analyze`: Only analyze the codebase without making changes.

  - `--refactor`: Perform automated refactoring.

  - `--lint`: Check code quality with ESLint.

  - `--test`: Run unit tests to verify refactoring logic.

  - `--document`: Generate documentation.

## Features

1. **Source Code Analysis**: Scans the codebase to identify files and functions that need refactoring.

2. **Automated Refactoring**: Uses AST manipulation to refactor the code safely.

3. **Code Quality Checks**: Integrates with ESLint for code quality.

4. **Testing Support**: Provides a way to write unit tests for the refactoring logic.

5. **Documentation**: Generates documentation about changes made.

6. **Maintenance Mode**: Easy updates to the refactoring logic and guidelines.

## Contributing

1. Fork the project.

2. Create a new branch (`git checkout -b feature-branch`).

3. Make your changes.

4. Run tests (`npm test`).

5. Submit a pull request.