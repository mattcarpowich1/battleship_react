import * as Constants from '../constants'

function getAvailableCoordinates (grid, shipType, orientation) {
  if (!ORIENTATIONS.includes(orientation)) {
    throw new Error(`INVALID ARGUMENT "${orientation}."`)
  }
  return orientation === HORIZONTAL
    ? findHorizontalCoords(grid, shipType, SHIP_SIZES[shipType])
    : findVerticalCoords(grid, shipType, SHIP_SIZES[shipType])
}

function findHorizontalCoords (grid, shipType, shipSize) {
  const results = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (x > grid.length - shipSize) {
        results.push(false)
        continue
      }
      let isOpen = true
      let slot = grid[y].slice(x, x + shipSize)
      for (let i = 0; i < slot.length; i++) {
        if (slot[i] !== shipType &&
          slot[i] >= 0) {
          isOpen = false
        }
      }
      results.push(isOpen)
    }
  }
  return results
}

function findVerticalCoords (grid, shipType, shipSize) {
  const results = []
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid.length; x++) {
      if (y > grid.length - shipSize) {
        results.push(false)
        continue
      }
      let isOpen = true
      let slot = grid
          .slice(y, y + shipSize)
          .map(row => row[x])
      for (let i = 0; i < slot.length; i++) {
        if (slot[i] !== shipType &&
            slot[i] >= 0) {
          isOpen = false
        }
      }
      results.push(isOpen)
    }
  }
  return results
}

const {
  SHIP_SIZES,
  ORIENTATIONS,
  HORIZONTAL
} = Constants

export {
  getAvailableCoordinates
}
