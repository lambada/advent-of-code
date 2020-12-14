const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const program = input.split('\n').map(line => {
  return {
    operation: line.charAt(0),
    arg: Number.parseInt(line.slice(1), 10)
  }
})

const shipPosition = {
  ns: 0,
  ew: 0
}
const waypointPosition = {
  ns: 1,
  ew: 10
}

program.forEach(inst => {
  let tmpew // For L/R
  switch (inst.operation) {
    case 'N':
      waypointPosition.ns = waypointPosition.ns + inst.arg
      break
    case 'S':
      waypointPosition.ns = waypointPosition.ns - inst.arg
      break
    case 'E':
      waypointPosition.ew = waypointPosition.ew + inst.arg
      break
    case 'W':
      waypointPosition.ew = waypointPosition.ew - inst.arg
      break
    case 'L':
      switch (inst.arg) {
        case 90:
          // ew 10 => -20
          // ns 20 => 10
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ns * -1
          waypointPosition.ns = tmpew
          break
        case 180:
          // ew 10 => -10
          // ns 20 => -20
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ew * -1
          waypointPosition.ns = waypointPosition.ns * -1
          break
        case 270:
          // ew 10 => 20
          // ns 20 => -10
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ns
          waypointPosition.ns = tmpew * -1
          break
        default:
          console.error('Unhandled direction')
          console.error(inst.arg)
      }
      break
    case 'R':
      switch (inst.arg) {
        case 270:
          // ew 10 => -20
          // ns 20 => 10
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ns * -1
          waypointPosition.ns = tmpew
          break
        case 180:
          // ew 10 => -10
          // ns 20 => -20
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ew * -1
          waypointPosition.ns = waypointPosition.ns * -1
          break
        case 90:
          // ew 10 => 20
          // ns 20 => -10
          tmpew = waypointPosition.ew
          waypointPosition.ew = waypointPosition.ns
          waypointPosition.ns = tmpew * -1
          break
        default:
          console.error('Unhandled direction')
          console.error(inst.arg)
      }
      break
    case 'F':
      shipPosition.ew = shipPosition.ew + waypointPosition.ew * inst.arg
      shipPosition.ns = shipPosition.ns + waypointPosition.ns * inst.arg
      break
  }
})

console.log(Math.abs(shipPosition.ns) + Math.abs(shipPosition.ew))
