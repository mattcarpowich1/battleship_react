import React, { Component } from 'react'
import Main from './components/Main.js'
import StartScreen from './components/StartScreen.js'
import ShipSelect from './components/ShipSelect.js'
import Game from './components/Game.js'
import { generateNewGrid } from './utils'
import * as Constants from './constants'

class App extends Component {
  constructor () {
    super()
    this.state = {
      startClicked: false,
      shipSelect: false,
      currentPlayer: PLAYER_ONE,
      p1Grid: [],
      p2Grid: []
    }

    this.startShipSelect = this.startShipSelect.bind(this)
    this.setGrid = this.setGrid.bind(this)
    this.restartGame = this.restartGame.bind(this)
  }

  componentWillMount () {
    const initialGrid = generateNewGrid(DEFAULT_GRID_SIZE)
    this.setState({
      p1Grid: initialGrid.slice(),
      p2Grid: initialGrid.slice()
    })
  }

  startShipSelect () {
    this.setState({
      startClicked: true,
      shipSelect: true
    })
  }

  setGrid (player, grid) {
    if (player === PLAYER_ONE) {
      this.setState({
        p1Grid: grid,
        currentPlayer: PLAYER_TWO
      })
    } else {
      this.setState({
        p2Grid: grid,
        shipSelect: false,
        gameStarted: true
      })
    }
  }

  restartGame () {
    const initialGrid = generateNewGrid(DEFAULT_GRID_SIZE)
    this.setState({
      startClicked: false,
      shipSelect: false,
      currentPlayer: PLAYER_ONE,
      p1Grid: initialGrid.slice(),
      p2Grid: initialGrid.slice()
    })
  }

  render () {
    const {
      startClicked,
      currentPlayer,
      shipSelect,
      p1Grid,
      p2Grid
    } = this.state

    let content
    if (shipSelect) {
      content = (
        <ShipSelect
          grid={
            currentPlayer === PLAYER_ONE
            ? p1Grid : p2Grid
          }
          player={currentPlayer}
          handler={this.setGrid} />
      )
    } else if (startClicked) {
      content = (
        <Game
          grids={[p1Grid, p2Grid]}
          restart={this.restartGame} />
      )
    } else {
      content = <StartScreen handler={this.startShipSelect} />
    }

    return (
      <Main>
        {content}
      </Main>
    )
  }
}

const {
  PLAYER_ONE,
  PLAYER_TWO,
  DEFAULT_GRID_SIZE
} = Constants

export default App
