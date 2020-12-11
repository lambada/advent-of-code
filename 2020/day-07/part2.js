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
      const qty = Number.parseInt(containeeParts.shift(), 10)
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
    containingRules: contains
  }
})

let unCalculatableContainingQty = true
do {
  unCalculatableContainingQty = false
  rules.forEach(rule => {
    if (rule.containsQty !== undefined) return
    let ruleHasUnCalculatableContainingQty = false
    let containsQty = 0
    rule.containingRules.forEach(containingRule => {
      const matchingRule = rules.filter(rule => rule.name === containingRule.name)[0]
      if (matchingRule.containsQty === undefined) {
        ruleHasUnCalculatableContainingQty = true
      } else {
        containsQty = containsQty + containingRule.qty + (containingRule.qty * matchingRule.containsQty)
      }
    })
    if (ruleHasUnCalculatableContainingQty) {
      unCalculatableContainingQty = true
    } else {
      rule.containsQty = containsQty
    }
  })
} while (unCalculatableContainingQty)

console.log(rules.filter(rule => rule.name === 'shiny gold')[0])
