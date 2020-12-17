const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const inputs = input.split('\r\n')
  .map(line => line.split(' = '))
  .map(line => { return { inst: line[0], arg: line[1] } })

const memory = []
let mask = ''
inputs.forEach(instruction => {
  if (instruction.inst === 'mask') {
    mask = instruction.arg
    return
  }

  const destAddress = instruction.inst.match(/\[(\d+)+\]/)[1]
  const initialValue = Number.parseInt(instruction.arg, 10).toString(2).padStart(36, '0')
  let result = ''
  for (let i = 0; i < initialValue.length; i++) {
    switch (mask[i]) {
      case 'X':
        result = result + initialValue[i]
        break
      default:
        result = result + mask[i]
        break
    }
  }
  memory[destAddress] = result
})

let total = 0
memory.forEach(val => {
  total = total + Number.parseInt(val, 2)
})

console.log(total)
