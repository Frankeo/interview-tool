import { catchSignChange } from '../src/index';

describe('catchSignChange function', () => {
    test.each([
        [[1, 3, 4, 5], 0],
        [[1, -3, -4, 0, 5], 2],
        [[], 0],
        [[-47,84,-30,-11,-5,74,77], 3],
      ])("should return %s for %i", (arr, result) => {
        expect(catchSignChange(arr)).toBe(result);
    })
});