import React, { Component } from 'react'
import Grid from './Grid.js'
import Ship from './Ship.js'
import Header from './Header.js'
import { getAvailableCoordinates } from '../utils'
import * as Constants from '../constants'

class ShipSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: props.player,
      grid: props.grid,
      selectedShip: '',
      selectedCoordinates: [],
      numShips: SHIP_TYPES.length,
      shipLocations: SHIP_TYPES.map(type => {
        return DEFAULT_COORDINATES[type]
      }),
      availableCoordinates: getAvailableCoordinates(
        props.grid,
        SHIP_SIZES[PATROL_BOAT],
        HORIZONTAL
      )
    }

    this.toggleShipSelect = this.toggleShipSelect.bind(this)
    this.placeShip = this.placeShip.bind(this)
  }

  toggleShipSelect (type, x, y) {
    if (this.state.selectedShip === type) {
      this.setState({
        selectedShip: '',
        selectedCoordinates: [x, y]
      })
      return false
    }
    const availableCoordinates = getAvailableCoordinates(
      this.state.grid,
      SHIP_SIZES[type],
      HORIZONTAL
    )
    console.log(availableCoordinates)
    this.setState({
      selectedShip: type,
      selectedCoordinates: [x, y],
      availableCoordinates
    })
  }

  placeShip (x, y) {
    const { 
      grid,
      selectedShip, 
      shipLocations,
      selectedCoordinates,
      availableCoordinates,
      numShips } = this.state 
    if (!selectedShip) return false
    if (!availableCoordinates[y * 10 + x]) return false
    const index = SHIP_TYPES.indexOf(selectedShip)
    const updatedGrid = grid
      .reduce((acc, row, y2) => {
        const updatedRow = row.map((status, x2) => {
          const size = SHIP_SIZES[selectedShip]

          // EMPTY old coordinates
          if (y2 === selectedCoordinates[1]) {
            if (x2 >= selectedCoordinates[0]) {
              if (x2 < selectedCoordinates[0] + size) {
                return EMPTY
              }
            }
          }

          // PLACE new coordinates
          if (y === y2 
            && x2 >= x
            && x2 < x + size) {
            return ACTIVE
          }

          // LEAVE other active coordinates alone
          if (status === ACTIVE) {
            if (y2 !== y) {
              return ACTIVE
            } else {
              if (x2 >= x + size 
                || x2 < x) {
                return ACTIVE
              }
            }
          }

          // RETURN THE EMPTYS
          return status

        })
        return [...acc, updatedRow]
      }, [])
    this.setState({
      shipLocations: [
        ...shipLocations.slice(0, index),
        [x, y],
        ...shipLocations.slice(index + 1, numShips)
      ],
      grid: updatedGrid,
      selectedShip: '',
      selectedCoordinates: []
    })
  }

  render () {
    const { 
      player, 
      grid, 
      selectedShip,
      shipLocations,
      availableCoordinates 
    } = this.state
    console.log(grid)
    return (
      <div className='ship-select'>
        <Header subtitle={PLACEMENT_HINT}>
          {`Player ${player + 1} place your ships.`}
        </Header>
        <Grid coordinates={grid}
          selectedShip={selectedShip}
          available={availableCoordinates}
          placementHandler={this.placeShip}>
          {
            SHIP_TYPES.map((type, index) => {
              return (
                <Ship key={type}
                  type={type}
                  coordinates={shipLocations[index]}
                  isSelected={selectedShip === type}
                  selector={this.toggleShipSelect} />
              )
            })
          }
        </Grid>
      </div>
    )
  }
}

const {
  PLACEMENT_HINT,
  SHIP_TYPES,
  SHIP_SIZES,
  DEFAULT_COORDINATES,
  PATROL_BOAT,
  HORIZONTAL,
  ACTIVE,
  EMPTY
} = Constants

export default ShipSelect