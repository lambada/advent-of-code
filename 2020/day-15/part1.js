const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const inputs = input.split(',').map(n => Number.parseInt(n, 10))

console.log(inputs)

while (inputs.length < 2020) {
  const tmpArray = Array.from(inputs).slice(0, Array.length - 2)
  const lastNumber = inputs[inputs.length - 1]
  const lastIndex = tmpArray.lastIndexOf(lastNumber)
  if (lastIndex === -1) {
    inputs.push(0)
  } else {
    inputs.push(inputs.length - 1 - lastIndex)
  }
}

console.log(inputs[2019])