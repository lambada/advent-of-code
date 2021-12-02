const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const coordinates = inputArray.reduce((coordinates, instruction) => {
  const instArray = instruction.split(' ')
  if (instArray[0] === 'forward') {
    coordinates[0] = coordinates[0] + Number.parseInt(instArray[1], 10)
  }
  if (instArray[0] === 'up') {
    coordinates[1] = coordinates[1] - Number.parseInt(instArray[1], 10)
  }
  if (instArray[0] === 'down') {
    coordinates[1] = coordinates[1] + Number.parseInt(instArray[1], 10)
  }

  return coordinates
}, [0, 0])

console.log(coordinates[0] * coordinates[1])
