const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

const inputArray = input.split('\n\n')
const groupAnswers = inputArray.map(groupAnswer => {
  return groupAnswer.split('\n').map(personAnswer => { return personAnswer.split('') })
})

let total = 0
groupAnswers.forEach(groupAnswer => {
  groupAnswer[0].forEach(firstPersonAnswer => {
    let allPeopleInGroupAnswered = true
    for (let i = 1; i < groupAnswer.length; i++) {
      if (!groupAnswer[i].includes(firstPersonAnswer)) {
        allPeopleInGroupAnswered = false
      }
    }
    if (allPeopleInGroupAnswered) {
      total = total + 1
    }
  })
})

console.log(total)
