import React, { Component } from 'react'
import Grid from './Grid.js'
import Header from './Header.js'
import { 
  getAvailableCoordinates,
  updateSelection,
  checkIfValid 
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
      selectedOrientation: '',
      shipLocations: SHIP_TYPES.map(type => {
        return DEFAULT_COORDINATES[type]
      }),
      shipOrientations: DEFAULT_ORIENTATIONS,
      availableCoordinates: getAvailableCoordinates(
        props.grid,
        SHIP_SIZES[PATROL_BOAT],
        DEFAULT_ORIENTATIONS[PATROL_BOAT]
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
          DEFAULT_ORIENTATIONS[PATROL_BOAT]
        )
      })
    }
  }

  toggleShipSelect (x, y, type) {
    console.log(x, y, type)
    const { 
      shipLocations,
      selectedShip,
      selectedCoordinates,
      shipOrientations
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
      shipOrientations[type]
    )
    this.setState({
      selectedShip: type,
      selectedCoordinates: [x, y],
      availableCoordinates
    })
  }

  placeShip (x, y, rotate) {
    const { 
      availableCoordinates, 
      grid,
      shipLocations,
      shipOrientations,
      selectedShip,
      selectedCoordinates } = this.state
    const slotSize = SHIP_SIZES[selectedShip]
    let updatedGrid
    if (!availableCoordinates[y * 5 + x]) {
      return false
    } else {

      updatedGrid = updateSelection(
        grid,
        x, 
        y, 
        slotSize,
        selectedShip,
        selectedCoordinates,
        shipOrientations[selectedShip],
        rotate
      )
    }

    this.setState({
      grid: updatedGrid,
      shipLocations: [
        ...shipLocations.slice(0, selectedShip),
        [x, y],
        ...shipLocations.slice(selectedShip + 1, shipLocations.length)
      ],
      selectedCoordinates: [x, y]
    })
  }

  render () {
    const { 
      player, 
      grid, 
      selectedShip,
      shipLocations,
      selectedCoordinates,
      selectedOrientation,
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
          selectedOrientation={selectedOrientation}
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
  DEFAULT_ORIENTATIONS,
  PATROL_BOAT,
  HORIZONTAL,
  VERTICAL
} = Constants

export default ShipSelect
