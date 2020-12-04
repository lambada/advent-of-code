const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

for (let i = 0; i < inputArray.length - 2; i++) {
  const numI = Number.parseInt(inputArray[i], 10)
  for (let j = i + 1; j < inputArray.length - 1; j++) {
    const numJ = Number.parseInt(inputArray[j], 10)
    for (let k = j + 1; k < inputArray.length; k++) {
      const numK = Number.parseInt(inputArray[k], 10)
      if (numI + numJ + numK === 2020) {
        console.log(numI * numJ * numK)
      }
    }
  }
}
