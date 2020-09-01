import { isLeapYear } from '../src/index';

describe('isLeapYear function', () => {
    test('should return FALSE on 1997', () => {
        expect(isLeapYear(1997)).toBeFalsy();
    });
    test('should return TRUE on 1996', () => {
        expect(isLeapYear(1996)).toBeTruthy();
    });
    test('should return TRUE on 1600', () => {
        expect(isLeapYear(1600)).toBeTruthy();
    });
    test('should return FALSE on 1800', () => {
        expect(isLeapYear(1800)).toBeFalsy();
    });
});