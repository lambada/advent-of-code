const fs = require('fs')

const input = fs.readFileSync('input.txt', 'utf8')

let passports = input.split('\r\n\r\n')

passports = passports.map(passport => {
  return passport.split(/\s/).filter(field => !!field).map(field => {
    const kv = field.split(':')
    const ret = {}
    ret[kv[0]] = kv[1]
    return ret
  }).reduce((acc, field) => {
    return { ...acc, ...field }
  })
})

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const validPassports = passports.filter(passport => {
  for (const requiredField of requiredFields) {
    if (!passport[requiredField]) {
      return false
    }
  }

  return true
})
console.log(validPassports.length)
