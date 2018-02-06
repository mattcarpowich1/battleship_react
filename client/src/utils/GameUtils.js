import * as Constants from '../constants'

function getAvailableCoordinates (board, shipSize, orientation) {
    if (!ORIENTATIONS.includes(orientation)) {
      throw new Error(`INVALID ARGUMENT "${orientation}."`)
    }
    return orientation === HORIZONTAL 
      ? findHorizontalCoords(board, shipSize, orientation) 
      : findVerticalCoords(board, shipSize, orientation)
  }

function findHorizontalCoords (board, shipSize, orientation) {
  const results = []
  for (let y = 0; y < board.length; y++) {
    for (let x = 0; x < board.length; x++) {
      let slot = board[y].slice(x, x + shipSize)
      if (board[y][x] === EMPTY 
        && x <= board.length - shipSize
        && !slot.includes(ACTIVE)) {
        results.push(true)
      } else {
        results.push(false)
      }
    }
  }
  return results
}

function findVerticalCoords (board, shipSize, orientation) {
  const { boardSize, coordinates } = board
  const results = []
  for (let y = 0; y <= boardSize - shipSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      let slot = coordinates
        .slice(y, y + shipSize)
        .map(row => row[x])
      if (!coordinates[y][x] && !slot.includes(true)) {
        results.push([x, y])
      }
    }
  }
  return results 
}

const { 
  ORIENTATIONS, 
  HORIZONTAL,
  EMPTY,
  ACTIVE 
} = Constants

export {
  getAvailableCoordinates
}
