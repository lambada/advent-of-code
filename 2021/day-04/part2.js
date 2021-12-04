const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\r\n')

// Process the input data into usable format

const calledNumbers = inputArray[0].split(',')
let grids = inputArray.slice(1)
  .reduce((parsedGrids, currentLine) => {
    const currentGridBeingBuilt = parsedGrids[parsedGrids.length - 1]
    if (currentLine === '') {
      parsedGrids.push([])
    } else {
      const processedRow = currentLine.split(/\s+/).filter(entry => entry !== '')
      if (processedRow.length !== 0) {
        currentGridBeingBuilt.push(processedRow)
      }
    }
    return parsedGrids
  }, [])

// Run the game
let winningGrids = []
let calledNumber
for (let i = 0; i < calledNumbers.length; i++) {
  calledNumber = calledNumbers[i]

  // Apply to each grid
  grids = grids.map(grid => {
    return grid.map(row => {
      return row.map(entry => {
        if (entry === calledNumber) {
          return 'X'
        }
        return entry
      })
    })
  })

  // Examine for a winner
  winningGrids = grids.filter(grid => {
    let isWinner = false
    grid.forEach(row => {
      if (row[0] === 'X' && row[1] === 'X' && row[2] === 'X' && row[3] === 'X' && row[4] === 'X') {
        isWinner = true
      }
    })
    if (isWinner) {
      return true
    }

    for (let i = 0; i < 5; i++) {
      if (grid[0][i] === 'X' && grid[1][i] === 'X' && grid[2][i] === 'X' && grid[3][i] === 'X' && grid[4][i] === 'X') {
        isWinner = true
        break
      }
    }

    return isWinner
  })

  // Remove any 'early' winners
  if (winningGrids.length !== grids.length) {
    grids = grids.filter(grid => {
      return !winningGrids.includes(grid)
    })
  } else {
    break
  }
}

// Calculate the score

const gridScore = winningGrids[0].reduce((score, row) => {
  return score + row.reduce((rowScore, number) => {
    if (number === 'X') {
      return rowScore
    }
    return rowScore + Number.parseInt(number, 10)
  }, 0)
}, 0)

console.log(gridScore * Number.parseInt(calledNumber, 10))
