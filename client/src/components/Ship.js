import React, { Component } from 'react'
import Square from './Square.js'
import * as Constants from '../constants'

class Ship extends Component {
  constructor () {
    super()
    this.state = {
      orientation: HORIZONTAL
    }
  }

  render () {
    const {
      type,
      coordinates,
      isSelected,
      selector
    } = this.props
    const { orientation } = this.state

    let shipSquares = []
    for (let i = 0; i < SHIP_SIZES[type]; i++) {
      shipSquares.push(
        <Square key={`${type}${i}`}
          selected={isSelected} 
          status={IS_SHIP}
          locationX={coordinates[0]}
          locationY={coordinates[1]} />
      )
    }

    const location = {
      top: coordinates[1] * 48,
      left: coordinates[0] * 48
    }

    return (
      <div className={`ship ship-${orientation}`}
        onClick={() => selector(
          type, 
          coordinates[0], 
          coordinates[1]
        )}
        style={location}>
        {shipSquares}
      </div>
    )
  }
}

const { 
  IS_SHIP,
  SHIP_SIZES,
  DEFAULT_COORDINATES, 
  HORIZONTAL 
} = Constants

export default Ship
