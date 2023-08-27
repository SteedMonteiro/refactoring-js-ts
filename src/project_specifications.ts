```typescript
export interface ProjectSpecifications {
  maxLinesPerFile: number;
  maxLinesPerFunction: number;
  maxCharactersPerLine: number;
}

export const projectSpecifications: ProjectSpecifications = {
  maxLinesPerFile: 200,
  maxLinesPerFunction: 50,
  maxCharactersPerLine: 80,
};
```