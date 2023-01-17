/**
 * This function sorts a string containing words with numbers indicating the desired position of each word.
 * 
 * @param {string} inputString - the input string to be sorted
 * @returns {string} - the sorted string
 *
 * @example
 * sortString('g5et ski3lls on6 use1 your2 to4 7top');
 * // Output: 'use1 your2 ski3lls to4 g5et on6 7top'
 */
function sortString(inputString) {
  if (inputString === '') {
    return '';
  }

  const words = inputString.split(' ');
  const sortedWords = Array.from({length: 5}, () => '');

  words.forEach((word) => {
    for (const char of word) {
      if (Number.isInteger(parseInt(char))) {
        const index = parseInt(char) - 1;
        sortedWords[index] = word;
        break;
      }
    }
  });

  return sortedWords.join(' ');
}
