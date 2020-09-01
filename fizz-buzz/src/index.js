export const isLeapYear = (year) => {
    const isDivisibleBy = (number) => year % number == 0;
    return isDivisibleBy(100) ? isDivisibleBy(400) : isDivisibleBy(4);
  };
  