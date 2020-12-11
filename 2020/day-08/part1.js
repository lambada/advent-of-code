const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const program = input.split('\n').map(line => {
  return {
    operation: line.split(' ')[0],
    arg: Number.parseInt(line.split(' ')[1], 10)
  }
})

const visitedInstructions = new Set()
let acc = 0
let pc = 0
while (!visitedInstructions.has(pc)) {
  visitedInstructions.add(pc)
  const instruction = program[pc]
  switch (instruction.operation) {
    case 'nop':
      pc = pc + 1
      break
    case 'acc':
      acc = acc + instruction.arg
      pc = pc + 1
      break
    case 'jmp':
      pc = pc + instruction.arg
  }
}

console.log(acc)
