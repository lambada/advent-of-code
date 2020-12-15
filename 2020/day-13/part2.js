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
  .map((id, index) => {
    return {
      id,
      index
    }
  })
  .filter(bus => bus.id !== -1)
  // Sort to test the buses with the largest period first
  .sort((busA, busB) => {
    return busB.id - busA.id
  })

console.log(buses)

let t = 0
let matchFound = false
do {
  t = t + buses[0].id
  const timeToStartCheckingFrom = t - buses[0].index
  matchFound = true
  if (timeToStartCheckingFrom % 1000000 === 0) console.log('checking ' + timeToStartCheckingFrom)
  for (let i = 1; i < buses.length; i++) {
    if ((timeToStartCheckingFrom + buses[i].index) % buses[i].id !== 0) {
      matchFound = false
      break
    }
  }
} while (!matchFound)
console.log(t - buses[0].index)

console.log(buses)

// (t + index) % id === 0
// ((t % id) + (index % id)) % id === 0

// [
// { id: 7, index: 0 },
// { id: 13, index: 1 },
// { id: 59, index: 4 },
// { id: 31, index: 6 },
// { id: 19, index: 7 }
// ]
