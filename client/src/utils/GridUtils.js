import { 
  DEFAULT_COORDINATES,
  DEFAULT_ORIENTATIONS,
  SHIP_TYPES,
  SHIP_SIZES,
  HORIZONTAL
} from '../constants'

const generateNewGrid = size => {
  const grid = []
  for (let y = 0; y < size; y++) {
    let row = []
    for (let x = 0; x < size; x++) {
      let val = -1
      for (let i = 0; i < DEFAULT_COORDINATES.length; i++) {
        let [dX, dY] = DEFAULT_COORDINATES[i]
        if (DEFAULT_ORIENTATIONS[i] === HORIZONTAL) {
          if (y === dY && x >= dX && x < dX + SHIP_SIZES[i]) {
            val = SHIP_TYPES[i]
          } 
        } 
      }
      row.push(val)
    }
    grid.push(row)
  }
  return grid
}

const updateSelection = (
  grid,
  x, 
  y,   
  slotSize,
  selectedShip,
  selectedCoordinates,
  orientation
) => {
  let updatedGrid
  if (orientation === HORIZONTAL) {
    updatedGrid = grid
      .map((row, gridY) => {
        return row.map((value, gridX) => {
          //check if any coordinates are the same as before
          if (gridY === y
            && gridX >= x
            && gridX < x + slotSize
            && gridX >= selectedCoordinates[0]) {
            return selectedShip
          }
          //old location
          if (selectedCoordinates[1] === gridY
            && gridX >= selectedCoordinates[0]
            && gridX < selectedCoordinates[0] + slotSize) {
            return -1
          // new location
          } else if (gridY === y 
            && gridX >= x
            && gridX < x + slotSize) {
            return selectedShip
          } else {
            return value
          }
        })
      })
    }
  return updatedGrid
}

const updateGameGrid = (grid, x, y, val) => {
  return grid
    .map((row, gridY) => {
      return row.map((status, gridX) => {
        return gridY === y && gridX === x
          ? val
          : status
      })
    })
}

const checkRemaining = (ship, grid) => {
  return grid
    .reduce((acc, row) => {
      if (acc) return acc
      return row.includes(ship) ? true : false 
    }, false)
}

export {
  generateNewGrid,
  updateSelection,
  updateGameGrid,
  checkRemaining
}
