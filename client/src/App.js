import React, { Component } from 'react'
import Main from './components/Main.js'
import Game from './components/Game.js'
import StartScreen from './components/StartScreen.js'

class App extends Component {
  constructor () {
    super()
    this.state = {
      gameStarted: false
    }

    this.startGame = this.startGame.bind(this)
  }

  startGame () {
    this.setState({
      gameStarted: true
    })
  }

  render () {
    const { gameStarted } = this.state
    return (
      <Main>
        {
          gameStarted
          ? <Game />
          : <StartScreen handler={this.startGame} />
        }
      </Main>
    )
  }
}

export default App
