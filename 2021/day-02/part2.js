const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const coordinates = inputArray.reduce((coordinates, instruction) => {
  const instArray = instruction.split(' ')
  if (instArray[0] === 'forward') {
    coordinates.horizontal = coordinates.horizontal + Number.parseInt(instArray[1], 10)
    coordinates.depth = coordinates.depth + (coordinates.aim * Number.parseInt(instArray[1], 10))
  }
  if (instArray[0] === 'up') {
    coordinates.aim = coordinates.aim - Number.parseInt(instArray[1], 10)
  }
  if (instArray[0] === 'down') {
    coordinates.aim = coordinates.aim + Number.parseInt(instArray[1], 10)
  }

  return coordinates
}, {
  aim: 0,
  depth: 0,
  horizontal: 0
})

console.log(coordinates.depth * coordinates.horizontal)
