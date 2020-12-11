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

const qty1 = differences.filter(difference => difference === 1).length
const qty3 = differences.filter(difference => difference === 3).length
console.log(qty1 * qty3)
