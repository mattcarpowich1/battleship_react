import * as Constants from '../constants'

const generateNewGrid = size => {

  const locations = SHIP_TYPES
    .map(type => DEFAULT_COORDINATES[type])

  const grid = []
  for (let y = 0; y < size; y++) {
    let row = []
    for (let x = 0; x < size; x++) {
      const locationCheck = locations
        .reduce((acc, location, index) => {
          if (acc) {
            return true
          }
          return checkValues(x, y, location, SHIP_SIZES[SHIP_TYPES[index]])
        }, false)
      row.push(locationCheck ? ACTIVE : EMPTY)
    }
    grid.push(row)
  }
  return grid
}

const checkValues = (x, y, location, size) => {
  if (y === location[1] 
    && x >= location[0]
    && x < location[0] + size) {
    return true
  } 
  return false
}

const {
  EMPTY,
  ACTIVE,
  SHIP_TYPES,
  SHIP_SIZES,
  DEFAULT_COORDINATES
} = Constants

export {
  generateNewGrid
}
