/**
 * Returns the next larger number formed from the same digits as the input number
 * @param {number} num - A positive integer
 * @returns {number} - The next larger number or -1 if no larger number can be formed
 * @example
 * biggerNumber(23) // 32;
 * biggerNumber(624) // 642;
 * biggerNumber(2018) //  2081;
 * biggerNumber(9) = -1;
 * biggerNumber(111) = -1;
 * biggerNumber(531) = -1;
 */
function biggerNumber(num) {
  let numArr = num.toString().split('');
  let right = numArr.length - 1;
  let left = right - 1;

  while (right > 0 && numArr[left] >= numArr[right]) {
    left--;

    if (left < 0) {
      right--;
      left = right - 1;
    }
  }

  if (right <= 0) {
    return -1;
  }

  const temp = numArr[left];
  numArr[left] = numArr[right];
  numArr[right] = temp;

  return numArr
    .slice(0, left + 1)
    .concat(numArr.slice(left + 1).sort())
    .join('');
}
