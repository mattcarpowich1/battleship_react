import React, { Component } from 'react'
import Square from './Square.js'
import { EMPTY } from '../constants'

class Grid extends Component {
  render () {
    const {
      children,
      coordinates,
      shipLocations,
      selectedShip,
      selectedCoordinates,
      availableCoordinates,
      handleSelect,
      handlePlacement
    } = this.props

    return (
      <div className='grid'>
        <div className='fleet'>
          {children}
        </div>
        {
          coordinates
            .map((row, y) => {
              return row
                .map((val, x) => {
                  return (
                    <Square key={`${x},${y}`}
                      value={val}
                      locationX={x}
                      locationY={y}
                      isSelected={
                        selectedShip >= 0 
                        && selectedShip === val
                      }
                      isAvailable={availableCoordinates[y * 5 + x]}
                      selectedShip={selectedShip}
                      selectedCoordinates={selectedCoordinates}
                      nearestLocation={shipLocations[val]}
                      handleSelect={handleSelect}
                      canPlaceShip={selectedShip >= 0}
                      handlePlacement={handlePlacement} />
                  )
                })
            })
        }
      </div>
    )
  }
}

export default Grid
