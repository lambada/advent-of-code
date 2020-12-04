const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const processed = inputArray.map(entry => {
  const parts = entry.split(':')
  const password = parts[1].trim()
  const rule = parts[0].split(' ')
  const neededCharacter = rule[1]
  const neededTimes = rule[0].split('-')
  const neededMin = neededTimes[0]
  const neededMax = neededTimes[1]

  return {
    password,
    neededCharacter,
    neededMin,
    neededMax
  }
})

let validCount = 0

processed.forEach(entry => {
  const matches = entry.password.match(new RegExp(entry.neededCharacter, 'g')) || []
  if (entry.neededMin <= matches.length && matches.length <= entry.neededMax) {
    validCount++
  }
})

console.log(validCount)
