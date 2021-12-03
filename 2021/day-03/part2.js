const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\r\n')

const numberOfBits = inputArray[0].length

const calc = (input, method) => {
  for (let i = 0; i < numberOfBits; i++) {
    const numberOf1s = input.reduce((total, entry) => {
      return total + Number.parseInt(entry[i], 10)
    }, 0)

    let keep1s = false
    if (method === 'most') {
      keep1s = numberOf1s >= (input.length / 2)
    } else {
      keep1s = numberOf1s < (input.length / 2)
    }

    if (keep1s) {
      input = input.filter(value => { return value[i] === '1' })
    } else {
      input = input.filter(value => { return value[i] === '0' })
    }

    if (input.length === 1) {
      break
    }
  }
  return Number.parseInt(input[0], 2)
}

console.log(calc(inputArray, 'most') * calc(inputArray, 'least'))
