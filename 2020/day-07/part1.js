const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')
const rules = input.split('\n').map(ruleAsText => {
  const name = ruleAsText.match(/^(.*) bags contain/)[1]

  let contains = ruleAsText.match(/.* bags contain (.*)/)[1].slice(0, -1).split(',')
    .map(containee => containee.trim())
    .map(containee => containee.match(/(.*) bags?/)[1])
    .map(containee => {
      if (containee === 'no other') {
        return undefined
      }
      const containeeParts = containee.split(' ')
      const qty = containeeParts.shift()
      const name = containeeParts.join(' ')
      return {
        name,
        qty
      }
    })
  if (contains.length === 1 && contains[0] === undefined) {
    contains = []
  }
  return {
    name,
    contains
  }
})

const containingBags = ['shiny gold']

for (let i = 0; i < containingBags.length; i++) {
  const currentTargetBag = containingBags[i]

  rules.forEach(rule => {
    rule.contains.forEach(contains => {
      if (contains.name === currentTargetBag && !containingBags.includes(rule.name)) {
        containingBags.push(rule.name)
      }
    })
  })
}

containingBags.shift() // Strip off the bag I have

console.log(containingBags.length)
