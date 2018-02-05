import { EMPTY } from '../constants'

const generateNewGrid = size => {
  const grid = []
  for (let y = 0; y < size; y++) {
    let row = []
    for (let x = 0; x < size; x++) {
      row.push(EMPTY)
    }
    grid.push(row)
  }
  return grid
}

export {
  generateNewGrid
}
