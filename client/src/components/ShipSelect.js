import React, { Component } from 'react'
import Grid from './Grid.js'
import Ship from './Ship.js'
import Header from './Header.js'
import { 
  getAvailableCoordinates,
  updateGrid 
} from '../utils'
import * as Constants from '../constants'

class ShipSelect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      player: props.player,
      grid: props.grid,
      selectedShip: -1,
      selectedCoordinates: [],
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.player > this.props.player) {
      this.setState({
        player: nextProps.player,
        grid: nextProps.grid,
        shipLocations: SHIP_TYPES.map(type => {
          return DEFAULT_COORDINATES[type]
        }),
        selectedShip: -1,
        selectedCoordinates: [],
        availableCoordinates: getAvailableCoordinates(
          nextProps.grid,
          SHIP_SIZES[PATROL_BOAT],
          HORIZONTAL
        )
      })
    }
  }

  toggleShipSelect (x, y, type) {
    const { 
      shipLocations,
      selectedShip,
      selectedCoordinates
    } = this.state

    if (type === selectedShip
      && x === shipLocations[type][0]
      && y === shipLocations[type][1]) {
      this.setState({
        selectedShip: -1,
        selectedCoordinates: []
      })
      return false
    }
    const availableCoordinates = getAvailableCoordinates(
      this.state.grid,
      type,
      HORIZONTAL
    )
    this.setState({
      selectedShip: type,
      selectedCoordinates: [x, y],
      availableCoordinates
    })
  }

  placeShip (x, y) {
    const { 
      availableCoordinates, 
      grid,
      shipLocations,
      selectedShip,
      selectedCoordinates } = this.state
    const slotSize = SHIP_SIZES[selectedShip]
    let updatedGrid
    if (!availableCoordinates[y * 5 + x]) {
      return false
    } else {
      updatedGrid = updateGrid(
        grid,
        x, 
        y, 
        slotSize,
        selectedShip,
        selectedCoordinates
      )
    }
    this.setState({
      grid: updatedGrid,
      selectedShip: -1,
      selectedCoordinates: [],
      shipLocations: [
        ...shipLocations.slice(0, selectedShip),
        [x, y],
        ...shipLocations.slice(selectedShip + 1, shipLocations.length)
      ]
    })
  }

  render () {
    const { 
      player, 
      grid, 
      selectedShip,
      shipLocations,
      selectedCoordinates,
      availableCoordinates 
    } = this.state
    const { handler } = this.props
    return (
      <div className='ship-select'>
        <Header subtitle={PLACEMENT_HINT}>
          {`Player ${player + 1} place your ships.`}
        </Header>
        <Grid coordinates={grid}
          shipLocations={shipLocations}
          selectedShip={selectedShip}
          selectedCoordinates={selectedCoordinates}
          availableCoordinates={availableCoordinates}
          handleSelect={this.toggleShipSelect}
          handlePlacement={this.placeShip} />
        <button className='btn'
          onClick={() => handler(player, grid)}>Submit Grid</button>
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
  HORIZONTAL
} = Constants

export default ShipSelect
