const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

let count = 0
for (let i = 0; i < inputArray.length - 1; i++) {
  const numI = Number.parseInt(inputArray[i], 10)
  const numJ = Number.parseInt(inputArray[i + 1], 10)
  if (numI < numJ) {
    count++
  }
}

console.log(count)
