import React, { Component } from 'react'
import Grid from './Grid.js'
import { generateNewGrid } from '../utils'
import * as Constants from '../constants'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      currentPlayer: PLAYER_ONE,
      grids: []
    }
  }

  componentWillMount () {
    const emptyGrid = generateNewGrid(DEFAULT_GRID_SIZE)
    this.setState({
      grids: [
        emptyGrid, 
        emptyGrid
      ]
    })
  }

  render () {
    const { currentPlayer, grids } = this.state
    return (
      <div className='game'>
        <Grid coordinates={grids[currentPlayer]} />
      </div>
    )
  }
}

const { PLAYER_ONE, DEFAULT_GRID_SIZE } = Constants

export default Game
