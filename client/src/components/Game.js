import React, { Component } from 'react'
import * as Constants from '../constants'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      currentPlayer: PLAYER_ONE,
      gameState: SHIP_PLACEMENT,
      playerOneGrid: [],
      playerTwoGrid: []
    }
  }

  render () {
    return (
      <div>The Game!</div>
    )
  }
}

const {
  PLAYER_ONE,
  PLAYER_TWO,
  SHIP_PLACEMENT
} = Constants

export default Game
