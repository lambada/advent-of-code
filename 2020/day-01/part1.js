const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

for (let i = 0; i < inputArray.length - 1; i++) {
  const numI = Number.parseInt(inputArray[i], 10)
  for (let j = i + 1; j < inputArray.length; j++) {
    const numJ = Number.parseInt(inputArray[j], 10)
    if (numI + numJ === 2020) {
      console.log(numI * numJ)
    }
  }
}
