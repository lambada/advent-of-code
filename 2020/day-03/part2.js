const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const processed = inputArray.map(row => {
  return row.split('')
})

const calculateCollisions = (across, down) => {
  let currentX = 0
  let currentY = 0

  let treeCount = 0 // Trees are #
  while (currentY < processed.length) {
    if (processed[currentY][currentX] === '#') {
      treeCount++
    }

    currentX = (currentX + across) % processed[currentY].length
    currentY = currentY + down
  }
  return treeCount
}

let totalTreeCount = 1

totalTreeCount = totalTreeCount * calculateCollisions(1, 1)
totalTreeCount = totalTreeCount * calculateCollisions(3, 1)
totalTreeCount = totalTreeCount * calculateCollisions(5, 1)
totalTreeCount = totalTreeCount * calculateCollisions(7, 1)
totalTreeCount = totalTreeCount * calculateCollisions(1, 2)

console.log(totalTreeCount)
