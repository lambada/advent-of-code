// Example input
// const input="1,9,10,3,2,3,11,0,99,30,40,50"

// My input
// const input="1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0"

// 1202 alarm input
const input="1,12,2,3,1,1,2,3,1,3,4,3,1,5,0,3,2,6,1,19,1,19,10,23,2,13,23,27,1,5,27,31,2,6,31,35,1,6,35,39,2,39,9,43,1,5,43,47,1,13,47,51,1,10,51,55,2,55,10,59,2,10,59,63,1,9,63,67,2,67,13,71,1,71,6,75,2,6,75,79,1,5,79,83,2,83,9,87,1,6,87,91,2,91,6,95,1,95,6,99,2,99,13,103,1,6,103,107,1,2,107,111,1,111,9,0,99,2,14,0,0"


const program = input.split(",").map(stringValue => {return parseInt(stringValue)})
let pointer = 0

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
    default:
      console.error(`Unrecognised instruction: ${instruction} at location ${pointer}`)
  }
}

console.log(program)