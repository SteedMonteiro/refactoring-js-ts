import * as fs from 'fs';
import * as path from 'path';

type DocumentationData = {
    fileName: string;
    lineCount: number;
    functions: {
        name: string;
        lineCount: number;
    }[];
};

export class Documenter {
    private outputPath: string;

    constructor(outputPath: string = './documentation.md') {
        this.outputPath = outputPath;
    }

    /**
     * Generate documentation based on the provided data.
     * @param data - The data to be included in the documentation.
     */
    public generateDocumentation(data: DocumentationData[]): void {
        const documentationContent = this.formatData(data);
        fs.writeFileSync(path.resolve(this.outputPath), documentationContent);
    }

    /**
     * Format the data into a string that can be written to the documentation file.
     * @param data - The data to be formatted.
     * @returns The formatted data.
     */
    private formatData(data: DocumentationData[]): string {
        let documentation = '# Codebase Documentation\n\n';
        data.forEach((fileData) => {
            documentation += `## File: ${fileData.fileName}\n`;
            documentation += `**Total Lines**: ${fileData.lineCount}\n\n`;

            documentation += '### Functions:\n';
            fileData.functions.forEach((fn) => {
                documentation += `- **Name**: ${fn.name}\n`;
                documentation += `  - **Lines**: ${fn.lineCount}\n`;
            });
            documentation += '\n';
        });

        return documentation;
    }
}
