const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const processed = inputArray.map(entry => {
  const parts = entry.split(':')
  const password = parts[1].trim()
  const rule = parts[0].split(' ')
  const neededCharacter = rule[1]
  const validPositions = rule[0].split('-')
  const position1 = Number.parseInt(validPositions[0], 10) - 1 // Their data isn't 0 indexed
  const position2 = Number.parseInt(validPositions[1], 10) - 1

  return {
    password,
    neededCharacter,
    position1,
    position2
  }
})

let validCount = 0

processed.forEach(entry => {
  const position1Match = entry.password.charAt(entry.position1) === entry.neededCharacter
  const position2Match = entry.password.charAt(entry.position2) === entry.neededCharacter
  if ((position1Match && !position2Match) || (!position1Match && position2Match)) {
    validCount++
  }
})

console.log(validCount)
