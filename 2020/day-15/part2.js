const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const inputs = input.split(',').map(n => Number.parseInt(n, 10))
const targetIndex = 30000000

console.log(inputs)
let lastNumber = inputs.pop()

const lastIndexes = []
inputs.forEach((input, index) => {
  lastIndexes[input] = index
})

while (inputs.length < targetIndex) {
  const lastIndex = lastIndexes[lastNumber]
  inputs.push(lastNumber)
  lastIndexes[lastNumber] = inputs.length - 1
  if (lastIndex === undefined) {
    lastNumber = 0
  } else {
    lastNumber = inputs.length - 1 - lastIndex
  }
}

console.log(inputs[targetIndex - 1])
