
const intcodeComputer = (program, input) => {
  program = program.slice()
  let pointer = 0
  let inputPointer = 0
  let output = []
  while (program[pointer] !== 99) {
    const instruction = program[pointer]
    let operand1Location, operand2Location, resultLocation

    switch (instruction) {
      case 1:
        operand1Location = program[pointer + 1]
        operand2Location = program[pointer+2]
        resultLocation=program[pointer+3]
        program[resultLocation] = program[operand1Location] + program[operand2Location]
        pointer = pointer + 4
        break
      case 2:
        operand1Location = program[pointer+1]
        operand2Location = program[pointer+2]
        resultLocation=program[pointer+3]
        program[resultLocation] = program[operand1Location] * program[operand2Location]
        pointer = pointer + 4
        break
      case 3:
        resultLocation=program[pointer+1]
        program[resultLocation] = input[inputPointer]
        pointer = pointer + 2
        inputPointer++
        break
      case 4:
        resultLocation=program[pointer+1]
        output.push(program[resultLocation])
        pointer = pointer + 2
        break
      default:
        console.error(`Unrecognised instruction: ${instruction} at location ${pointer}`)
    }
  }

  return {program, output}
}

// My input
const programSource="3,0,4,0,99"
const program = programSource.split(",").map(stringValue => {return parseInt(stringValue)})

const input = [105168574]

let result = intcodeComputer(program, input)
console.log(result)