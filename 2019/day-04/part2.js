const min = 278384
const max = 824795

let matchesCount = 0
for (let i = min; i <=max; i++) {
  const iString = i.toString(10)
  let matches = iString.match(/(\d)\1+/g)
  if (matches) matches = matches.filter(match => match.length === 2)
  if (matches && matches.length != 0) {
    const iArray = iString.split("")
    let noDecreasing = true
    for (let j = 0; j < 5; j++) {
      if (iArray[j] > iArray[j+1]) {
        noDecreasing = false
        break
      }
    }
    if (noDecreasing) {
      matchesCount++
    }
  }
}

console.log(matchesCount)
