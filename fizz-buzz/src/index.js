export const fizzBuzzTransform = (number) => {
  let result = "";
  const isMultipleOf = (value) => number % value == 0;
  if (isMultipleOf(3)) result += "Fizz";
  if (isMultipleOf(5)) result += "Buzz";
  return !result? number.toString() : result;
};
