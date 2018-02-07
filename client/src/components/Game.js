import React, { Component } from 'react'
import * as Constants from '../constants'

class Game extends Component {
  constructor () {
    super()
    this.state = {
      currentPlayer: PLAYER_ONE,
      grids: []
    }
  }

  render () {
    const { 
      currentPlayer,
      grids
    } = this.state

    return (
      <div className='game'>
        <h1>The Game!</h1>
      </div>
    )
  }
}

const { 
  PLAYER_ONE
} = Constants

export default Game
