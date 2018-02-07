import React, { Component } from 'react'
import Grid from './Grid.js'
import GameNotifications from './GameNotifications.js'
import Header from './Header.js'
import { checkRemaining, updateGameGrid } from '../utils'
import * as Constants from '../constants'

class Game extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentPlayer: PLAYER_ONE,
      grids: props.grids,
      remainingShips: [2, 2],
      notification: 'Test',
      gameOver: false,
      currentResult: ''
    }

    this.registerAttack = this.registerAttack.bind(this)
  }

  registerAttack (x, y, val) {
    const {
      currentPlayer,
      grids,
      remainingShips
    } = this.state
    const [p1Grid, p2Grid] = grids
    const currentGrid = currentPlayer === PLAYER_ONE
      ? p2Grid
      : p1Grid
    const playerUnderAttack = currentPlayer === PLAYER_ONE
      ? PLAYER_TWO
      : PLAYER_ONE
    if (typeof(val) !== 'number') {
      this.setState({
        notification: ALREADY_TAKEN
      })
    }
    let result
    let updatedGrid
    let stillFloating
    switch (val) {
      case -1:
        updatedGrid = updateGameGrid(currentGrid, x, y, MISS)
        this.setState({
          grids: [
              ...grids.slice(0, playerUnderAttack),
              updatedGrid,
              ...grids.slice(playerUnderAttack + 1),
            ],
          notification: MISS,
          currentPlayer: playerUnderAttack
        })
        break
      case PATROL_BOAT:
        updatedGrid = updateGameGrid(currentGrid, x, y, HIT)
        stillFloating = checkRemaining(PATROL_BOAT, updatedGrid)
        if (!stillFloating) {
          if (remainingShips[playerUnderAttack] <= 1) {
            this.setState({
              grids: [
                ...grids.slice(0, playerUnderAttack),
                updatedGrid,
                ...grids.slice(playerUnderAttack + 1),
              ],
              notification: GAME_OVER,
              gameOver: true
            })
          } else {
            this.setState({
              remainingShips: [
                ...remainingShips.slice(0, playerUnderAttack),
                1,
                ...remainingShips.slice(playerUnderAttack + 1)
              ],
              notification: `PLAYER ${playerUnderAttack + 1} PATROL BOAT SUNK`,
              grids: [
                ...grids.slice(0, playerUnderAttack),
                updatedGrid,
                ...grids.slice(playerUnderAttack + 1),
              ],
              currentPlayer: playerUnderAttack
            })
          }
        } else {
          this.setState({
            notification: HIT,
            grids: [
              ...grids.slice(0, playerUnderAttack),
              updatedGrid,
              ...grids.slice(playerUnderAttack + 1),
            ],
            currentPlayer: playerUnderAttack
          })
        }
        break
      case SUBMARINE:
        updatedGrid = updateGameGrid(currentGrid, x, y, HIT)
        stillFloating = checkRemaining(SUBMARINE, updatedGrid)
        if (!stillFloating) {
          if (remainingShips[playerUnderAttack] <= 1) {
            this.setState({
              grids: [
                ...grids.slice(0, playerUnderAttack),
                updatedGrid,
                ...grids.slice(playerUnderAttack + 1),
              ],
              notification: GAME_OVER,
              gameOver: true
            })
          } else {
            this.setState({
              remainingShips: [
                ...remainingShips.slice(0, playerUnderAttack),
                1,
                ...remainingShips.slice(playerUnderAttack + 1)
              ],
              notification: `PLAYER ${playerUnderAttack + 1} SUBMARINE SUNK`,
              grids: [
                ...grids.slice(0, playerUnderAttack),
                updatedGrid,
                ...grids.slice(playerUnderAttack + 1),
              ],
              currentPlayer: playerUnderAttack
            })
          }
        } else {
          this.setState({
            notification: HIT,
            grids: [
              ...grids.slice(0, playerUnderAttack),
              updatedGrid,
              ...grids.slice(playerUnderAttack + 1),
            ],
            currentPlayer: playerUnderAttack
          })
        }
        break
      default:
        result = null
    }

  }

  render () {
    const { 
      currentPlayer,
      grids,
      notification
    } = this.state

    const [p1Grid, p2Grid] = grids
    console.log(this.state)

    return (
      <div className='game'>
        <GameNotifications message={notification}/>
        <div className='player'>
          <Header subtitle={currentPlayer === PLAYER_ONE ? ATTACK : ' '}>
            Player 1
          </Header>
          <Grid 
            coordinates={p1Grid}
            isGame={true}
            isUnderAttack={currentPlayer===PLAYER_TWO}
            attackHandler={this.registerAttack} />
        </div>
        <div className='player'>
          <Header subtitle={currentPlayer === PLAYER_TWO ? ATTACK : ' '}>
            Player 2
          </Header>
          <Grid coordinates={p2Grid}
            isGame={true}
            isUnderAttack={currentPlayer===PLAYER_ONE}
            attackHandler={this.registerAttack} />
        </div>
      </div>
    )
  }
}

const { 
  PLAYER_ONE,
  PLAYER_TWO,
  PATROL_BOAT,
  SUBMARINE,
  ATTACK,
  HIT,
  MISS,
  ALREADY_TAKEN,
  SUNK,
  GAME_OVER
} = Constants

export default Game
