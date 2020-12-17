const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const inputs = input.split(',').map(n => Number.parseInt(n, 10))
const targetIndex = 30000000

console.log(inputs)
let lastNumber = inputs.pop()
while (inputs.length < targetIndex) {
  const lastIndex = inputs.lastIndexOf(lastNumber)
  inputs.push(lastNumber)
  if (lastIndex === -1) {
    lastNumber = 0
  } else {
    lastNumber = inputs.length - 1 - lastIndex
  }
}

console.log(inputs[targetIndex - 1])
