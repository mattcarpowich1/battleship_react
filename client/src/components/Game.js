import React, { Component } from 'react'
// import Grid from './Grid.js'
// import Ship from './Ship.js'
// import Header from './Header.js'
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
