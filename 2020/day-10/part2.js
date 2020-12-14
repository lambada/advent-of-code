const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const adaptors = input.split('\n').map(line => Number.parseInt(line, 10))
adaptors.push(0)
const joltages = adaptors.sort((a, b) => a - b)
joltages.push(joltages[joltages.length - 1] + 3)

const differences = joltages.map((myJoltage, index) => {
  if (index === 0) {
    return 0
  }
  return myJoltage - joltages[index - 1]
})

differences.shift() // Don't need the 0 on the front
const diffStr = differences.join('')

const matches = diffStr.split('3') // Thank goddess there are no 2's in my input nor in the examples

const permutations = matches.map(match => match.length)
  .map(length => {
    switch (length) {
      case 2:
        return 2 // 2^1 - 0
      case 3:
        return 4 //  2^2 - 0
      case 4:
        return 7 // 2^3 - 1
      case 5:
        return 13 // 2^4 - 3
    }
    return 0 // No alternative permutations
  })
  .reduce((acc, perm) => {
    if (perm === 0) { return acc }
    return acc * perm
  }, 1) // We have 1 initial permutation.

console.log(permutations)

// Example 1
//          2^2      *     2^1 = 4 * 2
//          *  *          *
// 0, 1, 3, 1, 1, 1,  3,  1,  1,  3,  1,  3,  3
// 0, 1, 3, -, 2, 1,  3,  1,  1,  3,  1,  3,  3
// 0, 1, 3, 1, -, 2,  3,  1,  1,  3,  1,  3,  3
// 0, 1, 3, 1, 1, 1,  3,  -,  2,  3,  1,  3,  3
// 0, 1, 3, -, -, 3,  3,  1,  1,  3,  1,  3,  3
// 0, 1, 3, -, 2, 1,  3,  -,  2,  3,  1,  3,  3
// 0, 1, 3, 1, -, 2,  3,  -,  2,  3,  1,  3,  3
// 0, 1, 3, -, -, 3,  3,  -,  2,  3,  1,  3,  3

// Example 2
//    2^3 - 1    *    2^3 - 1    *     2^2      *  2^1    *    2^3 - 1     *           2^3 - 1
//    *  *  *        *  *  *           *  *        *           *  *  *                 *  *  *
// 0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 3, 1, 1, 3, 3, 1, 1, 1, 1, 3, 1, 3, 3, 1, 1, 1, 1,3
// 0, 1, 1, -, 2, 3                 3, 1, -, 2, 3
// 0, 1, -, 2, 1, 3                 3, -, 2, 1, 3
// 0, 1, -, -, 3, 3                 3, -, -, 3, 3
// 0, -, 2, 1, 1, 3
// 0, -, 2, -, 2, 3
// 0, -, -, 3, 1, 3
// 0, -, -, -, 4, 3 ERROR

// Extrapolating
//    2^4 - 3    =   13 combinations
//    *  *  *  *
// 0, 1, 1, 1, 1, 1, 3
// 0, 1, 1, 1, -, 2, 3
// 0, 1, 1, -, 2, 1, 3
// 0, 1, 1, -, -, 3, 3
// 0, 1, -, 2, 1, 1, 3
// 0, 1, -, 2, -, 2, 3
// 0, 1, -, -, 3, 1, 3
// 0, 1, -, -, -, 4, 3 ERROR
// 0, -, 2, 1, 1, 1, 3
// 0, -, 2, 1, -, 2, 3
// 0, -, 2, -, 2, 1, 3
// 0, -, 2, -, -, 3, 3
// 0, -, -, 3, 1, 1, 3
// 0, -, -, 3, -, 2, 3
// 0, -, -, -, 4, 1, 3 ERROR
// 0, -, -, -, -, 5, 3 ERROR

// Length of 1s  | Total
// 5             | 2^4 - 3
// 4             | 2^3 - 1
// 3             | 2^2 - 0
// 2             | 2^1 - 0
