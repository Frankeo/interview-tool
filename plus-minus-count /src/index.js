export const catchSignChange = arr => recursive(arr, 0);

const recursive = (arr, acc) => {  
  if (arr.length < 2) return acc;
  const isPositive = num => num >= 0;
  const [head, next, ...tail] = arr;  
  const newAcc = acc + (isPositive(head) != isPositive(next));
  return recursive([next, ...tail], newAcc)
};