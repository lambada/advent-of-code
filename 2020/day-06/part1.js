const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n\n')
const groupAnswers = inputArray.map(groupAnswer => {
  return groupAnswer.split('\n').map(personAnswer => { return personAnswer.split('') }).flat()
})

const answerSets = groupAnswers.map(groupAnswer => {
  const set = new Set()
  groupAnswer.forEach(answer => set.add(answer))
  return set
})

let total = 0

answerSets.forEach(answerSet => {
  total = total + answerSet.size
})
console.log(total)
