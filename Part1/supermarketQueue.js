/**
 * Calculates the total time required to serve all customers in a supermarket queue.
 *
 * @param {number[]} customers - An array of positive numbers representing the number of people in line.
 * @param {number} n - The number of cash registers, a positive number.
 *
 * @returns {number} - The total time required to serve all customers.
 *
 * @example
 * queueTime([5,3,4], 1); // Output: 12
 * queueTime([10, 2, 3, 3], 2); // Output: 10
 * queueTime([], 1); // Output: 0
 */
function queueTime(customers, n) {
  const checkoutTimes = Array.from({ length: n }, () => 0);

  for (const customer of customers) {
    const minTime = Math.min(...checkoutTimes);

    const index = checkoutTimes.indexOf(minTime);
    checkoutTimes[index] += customer;
  }

  return Math.max(...checkoutTimes);
}
