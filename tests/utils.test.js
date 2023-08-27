const { someUtilityFunction } = require('../src/utils.js');

describe('Utility Functions', () => {
  test('someUtilityFunction behaves as expected', () => {
    const input = 'some input';
    const expectedOutput = 'expected output';
    
    const result = someUtilityFunction(input);
    
    expect(result).toEqual(expectedOutput);
  });
});