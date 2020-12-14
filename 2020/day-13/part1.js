const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const lines = input.split('\n')
const arrivalTime = Number.parseInt(lines[0], 10)
const busIds = lines[1].split(',').filter(id => id !== 'x').map(id => Number.parseInt(id, 10))

const answer = busIds.map(id => {
  const timeToNextBus = id - (arrivalTime % id)
  return {
    id,
    timeToNextBus,
    answer: id * timeToNextBus
  }
}).reduce((shortestWait, currentBus) => {
  if (!shortestWait) {
    return currentBus
  } else if (shortestWait.timeToNextBus < currentBus.timeToNextBus) {
    return shortestWait
  } else {
    return currentBus
  }
}).answer

console.log(answer)
