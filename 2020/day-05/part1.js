const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const boardingPasses = input.split('\n')

const decodeSeat = (seat) => {
  const rowString = seat.slice(0, -3)
  const seatString = seat.slice(-3)

  let rowStart = 0
  let rowEnd = 127
  let seatStart = 0
  let seatEnd = 7

  for (let i = 0; i < rowString.length; i++) {
    const midPoint = ((rowEnd - rowStart) / 2) + rowStart
    if (rowString.charAt(i) === 'F') {
      rowEnd = Math.floor(midPoint)
    } else {
      rowStart = Math.round(midPoint)
    }
  }

  for (let i = 0; i < seatString.length; i++) {
    const midPoint = ((seatEnd - seatStart) / 2) + seatStart
    if (seatString.charAt(i) === 'L') {
      seatEnd = Math.floor(midPoint)
    } else {
      seatStart = Math.round(midPoint)
    }
  }

  return {
    seat: seatEnd,
    row: rowEnd
  }
}

const getSeatId = (row, seat) => {
  return row * 8 + seat
}

let highestSeatId = 0
boardingPasses.forEach(boardingPass => {
  const seat = decodeSeat(boardingPass)
  const seatId = getSeatId(seat.row, seat.seat)
  if (seatId > highestSeatId) {
    highestSeatId = seatId
  }
})

console.log(highestSeatId)
