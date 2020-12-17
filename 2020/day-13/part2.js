const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const lines = input.split('\n')
const buses = lines[1].split(',')
  .map(id => {
    if (id === 'x') {
      return -1
    }
    return id
  })
  .map(id => Number.parseInt(id, 10))
  // (t + index) % id === 0
  // ((t % id) + (index % id)) % id === 0
  // { id: 59, index: 4 }
  // ((t % 59) + (4 % 59)) % 59 === 0
  // ((t % 59) + 4) % 59 === 0
  // t % 59 must therefore equal 59 - 4 = 55; as 55 is hte only number that is both < 59 and add 4 === 59
  // t % 59 === 55
  .map((id, index) => {
    return {
      id,
      index,
      tModIdMustEqual: (id - (index % id)) % id // % id at end because if index is 0 it will === id
    }
  })
  .filter(bus => bus.id !== -1)
  // Sort to test the buses with the largest period first
  .sort((busA, busB) => {
    return busB.id - busA.id
  })

let t = 0
let matchFound = false
do {
  t = t + buses[0].id
  const timeToStartCheckingFrom = t - buses[0].index
  matchFound = true
  if (timeToStartCheckingFrom % 1000000 === 0) console.log('checking ' + timeToStartCheckingFrom)
  for (let i = 1; i < buses.length; i++) {
    //   // (t + index) % id === 0
    if (timeToStartCheckingFrom % buses[i].id !== buses[i].tModIdMustEqual) {
      matchFound = false
      break
    }
  }
} while (!matchFound)
console.log(t - buses[0].index)

console.log(buses)
