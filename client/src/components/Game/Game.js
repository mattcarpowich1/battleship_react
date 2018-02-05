import React, { Component } from 'react'
import * as Constants from '../../constants'
import './Game.css'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      currentPlayer: null,
      gameState: null,
      playerOneGrid: [],
      playerTwoGrid: []
    }
  }

  componentWillMount () {
    this.setState({
      currentPlayer: PLAYER_ONE,
      gameState: SHIP_PLACEMENT
    })
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
