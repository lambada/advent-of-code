const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const data = input.split('\n').map(number => Number.parseInt(number, 10))

const preambleLength = 25

let total
for (let i = preambleLength; i < data.length; i++) {
  const eligibleComponents = data.slice(i - preambleLength, i)
  const target = data[i]
  let targetFound = false
  for (let j = 0; j < preambleLength; j++) {
    for (let k = 0; k < preambleLength; k++) {
      if (eligibleComponents[j] + eligibleComponents[k] === target) {
        targetFound = true
        break
      }
    }
  }
  if (!targetFound) {
    total = target
    break
  }
}

let components
for (let i = 0; i < data.length; i++) {
  let runningTotal = data[i]
  components = []
  components.push(data[i])
  for (let j = i + 1; j < data.length; j++) {
    runningTotal = runningTotal + data[j]
    components.push(data[j])
    if (runningTotal > total || runningTotal === total) {
      break
    }
  }
  if (runningTotal === total) {
    break
  }
}

components.sort((a, b) => a - b)
console.log(components[0] + components[components.length - 1])
