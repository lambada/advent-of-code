const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const program = input.split('\n').map(line => {
  return {
    operation: line.charAt(0),
    arg: Number.parseInt(line.slice(1), 10)
  }
})

let ns = 0
let ew = 0
let dir = 90 // Starting east

program.forEach(inst => {
  switch (inst.operation) {
    case 'N':
      ns = ns + inst.arg
      break
    case 'S':
      ns = ns - inst.arg
      break
    case 'E':
      ew = ew + inst.arg
      break
    case 'W':
      ew = ew - inst.arg
      break
    case 'L':
      dir = dir - inst.arg
      break
    case 'R':
      dir = dir + inst.arg
      break
    case 'F':
      switch (dir) {
        case 0:
          ns = ns + inst.arg
          break
        case 90:
          ew = ew + inst.arg
          break
        case 180:
          ns = ns - inst.arg
          break
        case 270:
          ew = ew - inst.arg
          break
        default:
          console.error('Unhandled direction')
          console.error(dir)
      }
      break
  }
  if (dir >= 360) {
    dir = dir - 360
  }
  if (dir < 0) {
    dir = dir + 360
  }
})

console.log(Math.abs(ns) + Math.abs(ew))
