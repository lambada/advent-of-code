const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n').map(str => Number.parseInt(str, 10))

const count = inputArray.reduce((count, _, currentIndex, array) => {
  if (currentIndex === array.length - 3) {
    return count
  }

  if (array[currentIndex + 3] - array[currentIndex] > 0) {
    return count + 1
  }

  return count
}, 0)

console.log(count)
