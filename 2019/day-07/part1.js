
const intcodeComputer = (program, input) => {

  const getOperandValue = (program, pointerToParameter, parameterMode) => {
    if (parameterMode === '0' || parameterMode === '' ) {
      const operandLocation = program[pointerToParameter]
      return program[operandLocation]
    } else {
      return program[pointerToParameter]
    }
  }

  program = program.slice()
  let pointer = 0
  let inputPointer = 0
  let output = []
  while (program[pointer] !== 99) {

    const instruction = parseInt(program[pointer].toString().slice(-2))
    const parameterModesString = program[pointer].toString().slice(0,-2)
    const parameterModes = parameterModesString ? parameterModesString : '0000'

    let resultLocation
    let operand1, operand2

    switch (instruction) {
      case 1:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        resultLocation=program[pointer+3]
        program[resultLocation] = operand1 + operand2
        pointer = pointer + 4
        break
      case 2:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        resultLocation=program[pointer+3]
        program[resultLocation] = operand1 * operand2
        pointer = pointer + 4
        break
      case 3:
        resultLocation=program[pointer+1]
        program[resultLocation] = input[inputPointer]
        pointer = pointer + 2
        inputPointer++
        break
      case 4:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        output.push(operand1)
        pointer = pointer + 2
        break
      case 5:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        if (operand1 !== 0) {
          pointer = operand2
        } else {
          pointer = pointer + 3
        }
        break
      case 6:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        if (operand1 === 0) {
          pointer = operand2
        } else {
          pointer = pointer + 3
        }
        break
      case 7:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        resultLocation=program[pointer+3]
        program[resultLocation] = operand1 < operand2 ? 1 : 0
        pointer = pointer + 4
        break
      case 8:
        operand1 = getOperandValue(program, pointer + 1, parameterModes.slice(-1) )
        operand2 = getOperandValue(program, pointer + 2, parameterModes.slice(-2,-1) )
        resultLocation=program[pointer+3]
        program[resultLocation] = operand1 === operand2 ? 1 : 0
        pointer = pointer + 4
        break
      default:
        console.error(`Unrecognised instruction: ${instruction} at location ${pointer}`)
    }
  }

  return {program, output}
}

// My input
const programSource="3,8,1001,8,10,8,105,1,0,0,21,38,55,64,81,106,187,268,349,430,99999,3,9,101,2,9,9,1002,9,2,9,101,5,9,9,4,9,99,3,9,102,2,9,9,101,3,9,9,1002,9,4,9,4,9,99,3,9,102,2,9,9,4,9,99,3,9,1002,9,5,9,1001,9,4,9,102,4,9,9,4,9,99,3,9,102,2,9,9,1001,9,5,9,102,3,9,9,1001,9,4,9,102,5,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,1,9,9,4,9,99,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,99,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,99"

// Example input
//const programSource="3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0"
const program = programSource.split(",").map(stringValue => {return parseInt(stringValue)})

const phaseSettingsSource = '0,1,2,3,4'
const phaseSettings = phaseSettingsSource.split(",").map(stringValue => {return parseInt(stringValue)})

const phaseSettingsPermutations = [phaseSettings]
const nextPermutation = currentPerm => {
  //    Find the largest index k such that a[k] < a[k + 1]. If no such index exists, the permutation is the last permutation.
  let largestK = -1
  for (let k = 0; k < currentPerm.length; k++) {
    if (currentPerm[k] < currentPerm[k+1] && k > largestK) {
      largestK = k
    }
  }
  if (largestK === -1) {
    return
  }
  //     Find the largest index l greater than k such that a[k] < a[l].
  let largestL = -1
  for (let l = largestK+1; l < currentPerm.length; l++) {
    if (currentPerm[largestK] < currentPerm[l] && l > largestL) {
      largestL = l
    }
  }
  //     Swap the value of a[k] with that of a[l].
  const tmp = currentPerm[largestK]
  currentPerm[largestK] = currentPerm[largestL]
  currentPerm[largestL] = tmp
  //     Reverse the sequence from a[k + 1] up to and including the final element a[n].
  const nextPerm = currentPerm.slice(0,largestK+1).concat(currentPerm.slice(largestK+1).reverse())
  phaseSettingsPermutations.push(nextPerm)
  nextPermutation(nextPerm)
}

nextPermutation(phaseSettings)

let largestSignal = 0;

for (let i = 0; i < phaseSettingsPermutations.length; i++) {
  let phaseSettingPermutation = phaseSettingsPermutations[i]
  let lastOutput=0
  for (let j = 0; j < phaseSettingPermutation.length; j++) {
    const input=[phaseSettingPermutation[j],lastOutput]
    lastOutput = intcodeComputer(program, input).output[0]
  }
  if (lastOutput > largestSignal) {
    largestSignal = lastOutput
  }
}

console.log(largestSignal)