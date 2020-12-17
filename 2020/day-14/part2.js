const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const inputs = input.split('\r\n')
  .map(line => line.split(' = '))
  .map(line => { return { inst: line[0], arg: line[1] } })

const memory = {}
let mask = ''
inputs.forEach((instruction, line) => {
  if (instruction.inst === 'mask') {
    mask = instruction.arg
    return
  }

  const initialAddress = Number.parseInt(instruction.inst.match(/\[(\d+)+\]/)[1], 10).toString(2).padStart(36, '0')
  const value = Number.parseInt(instruction.arg, 10)

  let addressesToUpdate = []
  addressesToUpdate.push(initialAddress)
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] === '1') {
      addressesToUpdate = addressesToUpdate.map(add => add.slice(0, i) + '1' + add.slice(i + 1, add.length))
      continue
    }
    if (mask[i] === 'X') {
      const newAddressesToUpdate = []
      addressesToUpdate.forEach(add => {
        newAddressesToUpdate.push(add.slice(0, i) + '0' + add.slice(i + 1, add.length))
        newAddressesToUpdate.push(add.slice(0, i) + '1' + add.slice(i + 1, add.length))
      })
      addressesToUpdate = newAddressesToUpdate
    }
  }

  addressesToUpdate.forEach(address => {
    memory[Number.parseInt(address, 2)] = value
  })
})


const total = Object.values(memory).reduce((total, val) => {
  const newTotal = total + val
  return newTotal
}, 0)

console.log(total)
