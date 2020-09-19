## Plus Minus ... Count

Count how often sign changes in array.

### considerations:

- Number from 0 to infinity are positives (0 included as **positive**).

- Empty array and one element array returns 0

### example

```
const arr = [1, -3, -4, 0, 5];

| elem | count |
|------|-------|
|  1   |  0    |
| -3   |  1    |
| -4   |  1    |
|  0   |  2    |
|  5   |  2    |

catchSignChange(arr) == 2;
```
