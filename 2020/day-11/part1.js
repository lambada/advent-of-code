const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\r\n')

let seats = inputArray.map(row => {
  return row.split('')
})

const getSeat = (row, column) => {
  if (row < 0 || column < 0 || row >= seats.length || column >= seats[row].length) {
    return '.' // Static floor
  }
  return seats[row][column]
}

let changesMade = false

do {
  changesMade = false
  const nextIteration = seats.map(row => Array.from(row))

  for (let row = 0; row < seats.length; row++) {
    for (let column = 0; column < seats[row].length; column++) {
      const seat = seats[row][column]
      if (seat === '.') {
        nextIteration[row][column] = '.'
        continue
      }
      const occupiedSeats = [
        getSeat(row - 1, column),
        getSeat(row - 1, column + 1),
        getSeat(row, column + 1),
        getSeat(row + 1, column + 1),
        getSeat(row + 1, column),
        getSeat(row + 1, column - 1),
        getSeat(row, column - 1),
        getSeat(row - 1, column - 1)
      ].reduce((occupiedSeats, seat) => {
        if (seat === '#') return occupiedSeats + 1
        return occupiedSeats
      }, 0)

      if (seat === 'L' && occupiedSeats === 0) {
        nextIteration[row][column] = '#'
        changesMade = true
        continue
      }

      if (seat === '#' && occupiedSeats >= 4) {
        nextIteration[row][column] = 'L'
        changesMade = true
        continue
      }

      nextIteration[row][column] = seat
    }
  }
  seats = nextIteration
} while (changesMade)

let occupiedSeats = 0
seats.forEach(row => row.forEach(seat => { if (seat === '#') { occupiedSeats++ } }))
console.log(occupiedSeats)
