import {
  generateNewGrid,
  getAvailableCoordinates
} from '../utils'
import {
  PATROL_BOAT,
  DEFAULT_GRID_SIZE,
  HORIZONTAL,
  VERTICAL
} from '../constants'

function testGrid () {
  // 5x5 GRID
  // PATROL BOAT
  const emptyGrid = [
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1],
    [-1, -1, -1, -1, -1]
  ]

  const emptyHorizontal = [
    true, true, true, true, false,
    true, true, true, true, false,
    true, true, true, true, false,
    true, true, true, true, false,
    true, true, true, true, false
  ]

  const emptyVertical = [
    true, true, true, true, true,
    true, true, true, true, true,
    true, true, true, true, true,
    true, true, true, true, true,
    false, false, false, false, false
  ]

  // PRINT DEFAULT GRID
  console.log('DEFAULT GRID: ', generateNewGrid(DEFAULT_GRID_SIZE))

  // TEST AVAILABLE HORIZONTAL LOCATIONS
  const availableHorizontal = getAvailableCoordinates(
    emptyGrid,
    PATROL_BOAT,
    HORIZONTAL
  ).reduce((acc, val, index) => {
    return !acc ? acc : val === emptyHorizontal[index]
  }, true)

  // TEST AVAILABLE VERTICAL LOCATIONS
  const availableVertical = getAvailableCoordinates(
    emptyGrid,
    PATROL_BOAT,
    VERTICAL
  ).reduce((acc, val, index) => {
    return !acc ? acc : val === emptyVertical[index]
  }, true)

  if (availableHorizontal &&
    availableVertical) {
    console.log('All tests passed.')
  } else {
    console.log('Failed some tests.')
  }
}

export default testGrid
