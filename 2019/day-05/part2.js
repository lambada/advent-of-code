
const intcodeComputer = (program, input) => {
  const getOperandValue = (program, pointerToParameter, parameterMode) => {
    if (parameterMode === '0' || parameterMode === '') {
      const operandLocation = program[pointerToParameter]
      return program[operandLocation]
    } else {
      return program[pointerToParameter]
    }
  }

  program = program.slice()
  let pointer = 0
  let inputPointer = 0
  const output = []
  while (program[pointer] !== 99) {
    const instruction = parseInt(program[pointer].toString().slice(-2))
    const parameterModesString = program[pointer].toString().slice(0, -2)
    const parameterModes = parameterModesString || '0000'

    let resultLocation
    let operand1, operand2

    switch (instruction) {
      case 1:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        resultLocation = program[pointer + 3]
        program[resultLocation] = operand1 + operand2
        pointer = pointer + 4
        break
      case 2:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        resultLocation = program[pointer + 3]
        program[resultLocation] = operand1 * operand2
        pointer = pointer + 4
        break
      case 3:
        resultLocation = program[pointer + 1]
        program[resultLocation] = input[inputPointer]
        pointer = pointer + 2
        inputPointer++
        break
      case 4:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        output.push(operand1)
        pointer = pointer + 2
        break
      case 5:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        if (operand1 !== 0) {
          pointer = operand2
        } else {
          pointer = pointer + 3
        }
        break
      case 6:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        if (operand1 === 0) {
          pointer = operand2
        } else {
          pointer = pointer + 3
        }
        break
      case 7:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        resultLocation = program[pointer + 3]
        program[resultLocation] = operand1 < operand2 ? 1 : 0
        pointer = pointer + 4
        break
      case 8:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1))
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2, -1))
        resultLocation = program[pointer + 3]
        program[resultLocation] = operand1 === operand2 ? 1 : 0
        pointer = pointer + 4
        break
      default:
        console.error(`Unrecognised instruction: ${instruction} at location ${pointer}`)
    }
  }

  return { program, output }
}

// Example input, 8 equality tester, position mode
// const programSource="3,9,8,9,10,9,4,9,99,-1,8"
// const input = [7]
// const programSource="3,9,8,9,10,9,4,9,99,-1,8"
// const input = [8]
// const programSource="3,9,8,9,10,9,4,9,99,-1,8"
// const input = [9]

// Example input, less than 8 tester, position mode
// const programSource="3,9,7,9,10,9,4,9,99,-1,8"
// const input = [7]
// const programSource="3,9,7,9,10,9,4,9,99,-1,8"
// const input = [8]
// const programSource="3,9,7,9,10,9,4,9,99,-1,8"
// const input = [9]

// // Example input, 8 equality tester, immediate mode
// const programSource="3,3,1108,-1,8,3,4,3,99"
// const input = [7]
// const programSource="3,3,1108,-1,8,3,4,3,99"
// const input = [8]
// const programSource="3,3,1108,-1,8,3,4,3,99"
// const input = [9]

// Example input, less than 8 tester, immediate mode
// const programSource="3,3,1107,-1,8,3,4,3,99"
// const input = [7]
// const programSource="3,3,1107,-1,8,3,4,3,99"
// const input = [8]
// const programSource="3,3,1107,-1,8,3,4,3,99"
// const input = [9]

// Example input, jump tester, position mode
// const programSource="3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
// const input = [0]
// const programSource="3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9"
// const input = [1]

// Example input, jump tester, immediate mode
// const programSource="3,3,1105,-1,9,1101,0,0,12,4,12,99,1"
// const input = [0]
// const programSource="3,3,1105,-1,9,1101,0,0,12,4,12,99,1"
// const input = [1]

// Example input - large example
// const programSource="3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
// const input = [7]
// const programSource="3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
// const input = [8]
// const programSource="3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99"
// const input = [9]

// My input
const programSource = '3,225,1,225,6,6,1100,1,238,225,104,0,1101,11,91,225,1002,121,77,224,101,-6314,224,224,4,224,1002,223,8,223,1001,224,3,224,1,223,224,223,1102,74,62,225,1102,82,7,224,1001,224,-574,224,4,224,102,8,223,223,1001,224,3,224,1,224,223,223,1101,28,67,225,1102,42,15,225,2,196,96,224,101,-4446,224,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,86,57,225,1,148,69,224,1001,224,-77,224,4,224,102,8,223,223,1001,224,2,224,1,223,224,223,1101,82,83,225,101,87,14,224,1001,224,-178,224,4,224,1002,223,8,223,101,7,224,224,1,223,224,223,1101,38,35,225,102,31,65,224,1001,224,-868,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,57,27,224,1001,224,-84,224,4,224,102,8,223,223,1001,224,7,224,1,223,224,223,1101,61,78,225,1001,40,27,224,101,-89,224,224,4,224,1002,223,8,223,1001,224,1,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1008,677,226,224,1002,223,2,223,1006,224,329,101,1,223,223,8,226,677,224,102,2,223,223,1005,224,344,101,1,223,223,1107,226,677,224,102,2,223,223,1006,224,359,101,1,223,223,1007,226,226,224,102,2,223,223,1006,224,374,101,1,223,223,7,677,677,224,102,2,223,223,1005,224,389,1001,223,1,223,108,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,419,1001,223,1,223,1107,677,226,224,102,2,223,223,1005,224,434,1001,223,1,223,1108,677,677,224,102,2,223,223,1006,224,449,1001,223,1,223,7,226,677,224,102,2,223,223,1005,224,464,101,1,223,223,1008,677,677,224,102,2,223,223,1005,224,479,101,1,223,223,1007,226,677,224,1002,223,2,223,1006,224,494,101,1,223,223,8,677,226,224,1002,223,2,223,1005,224,509,101,1,223,223,1007,677,677,224,1002,223,2,223,1006,224,524,101,1,223,223,107,226,226,224,102,2,223,223,1006,224,539,101,1,223,223,107,226,677,224,102,2,223,223,1005,224,554,1001,223,1,223,7,677,226,224,102,2,223,223,1006,224,569,1001,223,1,223,107,677,677,224,1002,223,2,223,1005,224,584,101,1,223,223,1107,677,677,224,102,2,223,223,1005,224,599,101,1,223,223,1108,226,677,224,102,2,223,223,1006,224,614,101,1,223,223,8,226,226,224,102,2,223,223,1006,224,629,101,1,223,223,108,226,677,224,102,2,223,223,1005,224,644,1001,223,1,223,108,226,226,224,102,2,223,223,1005,224,659,101,1,223,223,1108,677,226,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226'
const input = [5]

const program = programSource.split(',').map(stringValue => { return parseInt(stringValue) })
const result = intcodeComputer(program, input)
console.log(result)
