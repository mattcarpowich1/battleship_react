import * as Constants from '../constants'

function getAvailableCoordinates (board, shipType, orientation) {
    if (!ORIENTATIONS.includes(orientation)) {
      throw new Error(`INVALID ARGUMENT "${orientation}."`)
    }
    return orientation === HORIZONTAL 
      ? findHorizontalCoords(board, shipType, SHIP_SIZES[shipType], orientation) 
      : findVerticalCoords(board, shipType, SHIP_SIZES[shipType], orientation)
  }

function findHorizontalCoords (board, shipType, shipSize, orientation) {
  const results = []
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      if (x > board.length - shipSize) {
        results.push(false)
        continue
      }
      let isOpen = true
      let slot = board[y].slice(x, x + shipSize)
      for (let i = 0; i < slot.length; i++) {
        if (slot[i] !== shipType
          && slot[i] >= 0) {
          isOpen = false 
        }
      }
      results.push(isOpen)
    }
  }
  return results
}

function findVerticalCoords (board, shipType, shipSize, orientation) {
  const results = []
  // for (let y = 0; y <= boardSize - shipSize; y++) {
  //   for (let x = 0; x < boardSize; x++) {
  //     let slot = coordinates
  //       .slice(y, y + shipSize)
  //       .map(row => row[x])
  //     console.log(slot)
  //     if (!coordinates[y][x] && !slot.includes(true)) {
  //       results.push([x, y])
  //     }
  //   }
  // }
  return results 
}

const {
  SHIP_TYPES,
  SHIP_SIZES, 
  ORIENTATIONS, 
  HORIZONTAL
} = Constants

export {
  getAvailableCoordinates
}
