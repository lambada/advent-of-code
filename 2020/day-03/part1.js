const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n')

const processed = inputArray.map(row => {
  return row.split('')
})

let currentX = 0
let currentY = 0

let treeCount = 0 // Trees are #
while (currentY < processed.length) {
  if (processed[currentY][currentX] === '#') {
    treeCount++
  }

  currentX = (currentX + 3) % processed[currentY].length
  currentY++
}

console.log(treeCount)
