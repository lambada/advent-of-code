const min = 278384
const max = 824795

let matches = 0
for (let i = min; i <=max; i++) {
  const iString = i.toString(10)
  if (iString.match(/(\d)\1/)) {
    const iArray = iString.split("")
    let noDecreasing = true
    for (let j = 0; j < 5; j++) {
      if (iArray[j] > iArray[j+1]) {
        noDecreasing = false
        break
      }
    }
    if (noDecreasing) {
      matches++
      console.log(i)
    }
  }
}

console.log(matches)