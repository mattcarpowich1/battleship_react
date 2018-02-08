import {
  generateNewGrid,
  updateSelection,
  updateGameGrid
} from '../utils'
import {
  PATROL_BOAT,
  SUBMARINE,
  SHIP_SIZES
} from '../constants'

const testGrid = () => {
  // 4x4 GRID
  // PATROL BOAT
  const emptyGrid = [
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1],
    [-1, -1, -1, -1]
  ]

  const allAvailable = [
    true, true, true, true,
    true, true, true, true,
    true, true, true, true,
    true, true, true, true
  ]

  const emptyHorizontal = [
    true, true, true, false,
    true, true, true, false,
    true, true, true, false,
    true, true, true, false
  ]

  const emptyVertical = [
    true, true, true, true,
    true, true, true, true,
    true, true, true, true,
    false, false, false, false
  ]

  const filledMiddleSquare = [
    true, true, true, true,
    true, false, false, true,
    true, false, false, true,
    true, true, true, true
  ]
}
