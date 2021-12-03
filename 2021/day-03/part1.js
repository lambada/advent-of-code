const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\r\n')

const numberOfBits = inputArray[0].length

let gammaString = ''
let epsilonString = ''
for (let i = 0; i < numberOfBits; i++) {
  const numberOf1s = inputArray.reduce((total, entry) => {
    return total + Number.parseInt(entry[i], 10)
  }, 0)

  if (numberOf1s > (inputArray.length / 2)) {
    gammaString = gammaString + '1'
    epsilonString = epsilonString + '0'
  } else {
    gammaString = gammaString + '0'
    epsilonString = epsilonString + '1'
  }
}

const gamma = Number.parseInt(gammaString, 2)
const epsilon = Number.parseInt(epsilonString, 2)

console.log(gamma * epsilon)
