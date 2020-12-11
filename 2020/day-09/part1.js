const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const data = input.split('\n').map(number => Number.parseInt(number, 10))

const preambleLength = 25

for (let i = preambleLength; i < data.length; i++) {
  const eligibleComponents = data.slice(i - preambleLength, i)
  const target = data[i]
  let targetFound = false
  for (let j = 0; j < preambleLength; j++) {
    for (let k = 0; k < preambleLength; k++) {
      if (eligibleComponents[j] + eligibleComponents[k] === target) {
        targetFound = true
        break
      }
    }
  }
  if (!targetFound) {
    console.log(target)
    break
  }
}
