const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\r\n')

let seats = inputArray.map(row => {
  return row.split('')
})

const getFirstSeatInDirection = (row, column, direction) => {
  let rowDelta
  let columnDelta
  switch (direction) {
    case 'u':
      rowDelta = -1
      columnDelta = 0
      break
    case 'ur':
      rowDelta = -1
      columnDelta = 1
      break
    case 'r':
      rowDelta = 0
      columnDelta = 1
      break
    case 'dr':
      rowDelta = 1
      columnDelta = 1
      break
    case 'd':
      rowDelta = 1
      columnDelta = 0
      break
    case 'dl':
      rowDelta = 1
      columnDelta = -1
      break
    case 'l':
      rowDelta = 0
      columnDelta = -1
      break
    case 'ul':
      rowDelta = -1
      columnDelta = -1
      break
  }

  let rowToCheck = row
  let columnToCheck = column
  do {
    rowToCheck = rowToCheck + rowDelta
    columnToCheck = columnToCheck + columnDelta

    if (rowToCheck < 0 || columnToCheck < 0 || rowToCheck >= seats.length || columnToCheck >= seats[rowToCheck].length) {
      return '.' // Static floor
    }

    if (seats[rowToCheck][columnToCheck] !== '.') {
      return seats[rowToCheck][columnToCheck]
    }
  } while (true)
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
        getFirstSeatInDirection(row, column, 'u'),
        getFirstSeatInDirection(row, column, 'ur'),
        getFirstSeatInDirection(row, column, 'r'),
        getFirstSeatInDirection(row, column, 'dr'),
        getFirstSeatInDirection(row, column, 'd'),
        getFirstSeatInDirection(row, column, 'dl'),
        getFirstSeatInDirection(row, column, 'l'),
        getFirstSeatInDirection(row, column, 'ul')
      ].reduce((occupiedSeats, seat) => {
        if (seat === '#') return occupiedSeats + 1
        return occupiedSeats
      }, 0)

      if (seat === 'L' && occupiedSeats === 0) {
        nextIteration[row][column] = '#'
        changesMade = true
        continue
      }

      if (seat === '#' && occupiedSeats >= 5) {
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
