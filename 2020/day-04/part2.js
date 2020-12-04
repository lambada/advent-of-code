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

const rangeChecker = (value, min, max) => {
  const year = Number.parseInt(value, 10)
  if (year < min || year > max) {
    return false
  }
  return true
}

const yearChecker = (value, min, max) => {
  if (!/^\d\d\d\d$/.test(value)) {
    return false
  }
  return rangeChecker(value, min, max)
}

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const validPassports = passports.filter(passport => {
  for (const requiredField of requiredFields) {
    if (!passport[requiredField]) {
      return false
    }
  }

  if (!yearChecker(passport.byr, 1920, 2002)) {
    return false
  }
  if (!yearChecker(passport.iyr, 2010, 2020)) {
    return false
  }
  if (!yearChecker(passport.eyr, 2020, 2030)) {
    return false
  }

  const hgt = passport.hgt
  if (/^\d+cm$/.test(hgt)) {
    const number = Number.parseInt(hgt.match(/^\d+/), 10)
    if (!rangeChecker(number, 150, 193)) {
      return false
    }
  } else if (/^\d+in$/.test(hgt)) {
    const number = Number.parseInt(hgt.match(/^\d+/), 10)
    if (!rangeChecker(number, 59, 76)) {
      return false
    }
  } else {
    return false
  }

  if (!/^#[0-9a-f]{6}$/.test(passport.hcl)) {
    return false
  }

  const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']
  if (!validEyeColors.includes(passport.ecl)) {
    return false
  }

  if (!/^[0-9]{9}$/.test(passport.pid)) {
    return false
  }

  return true
})
console.log(validPassports.length)
