import { fizzBuzzTransform } from "../src/index";

describe("fizzBuzzTransform function", () => {
  test.each([
    [1, "1"],
    [2, "2"],
    [3, "Fizz"],
    [4, "4"],
    [5, "Buzz"],
    [6, "Fizz"],
    [9, "Fizz"],
    [10, "Buzz"],
    [12, "Fizz"],
    [15, "FizzBuzz"],
    [18, "Fizz"],
    [20, "Buzz"],
    [21, "Fizz"],
    [23, "23"],
    [25, "Buzz"],
    [28, "28"],
    [30, "FizzBuzz"],
    [45, "FizzBuzz"],
    [60, "FizzBuzz"],
  ])("should return %s for %i", (input, expected) => {
    expect(fizzBuzzTransform(input)).toBe(expected);
  });
});
