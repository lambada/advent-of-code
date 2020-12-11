const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const program = input.split('\n').map(line => {
  return {
    operation: line.split(' ')[0],
    arg: Number.parseInt(line.split(' ')[1], 10)
  }
})

const run = program => {
  const visitedInstructions = new Set()
  let acc = 0
  let pc = 0
  let looped = false
  let finished = false
  while (true) {
    if (pc < 0) {
      break
    }
    if (visitedInstructions.has(pc)) {
      looped = true
      break
    }
    if (pc >= program.length) {
      finished = true
      break
    }
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

  return {
    looped,
    finished,
    acc
  }
}

let solution
for (let i = 0; i < program.length; i++) {
  if (program[i].operation === 'jmp') {
    const modifiedProgram = JSON.parse(JSON.stringify(program))
    modifiedProgram[i].operation = 'nop'
    const result = run(modifiedProgram)
    if (result.finished) {
      solution = result
      break
    }
  } else if (program[i].operation === 'nop') {
    const modifiedProgram = JSON.parse(JSON.stringify(program))
    modifiedProgram[i].operation = 'jmp'
    const result = run(modifiedProgram)
    if (result.finished) {
      solution = result
      break
    }
  }
}

console.log(solution)
