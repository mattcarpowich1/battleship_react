import React, { Component } from 'react'
import Square from './Square.js'
import { EMPTY } from '../constants'

class Grid extends Component {
  render () {
    const {
    children,
    coordinates,
    available,
    selectedShip,
    placementHandler
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
                .map((status, x) => {
                  const isOpen = available[y * 10 + x]
                    ? true : false
                  return (
                    <Square key={`${x},${y}`}
                      status={status}
                      open={isOpen}
                      toggle={selectedShip.length > 0}
                      locationX={x}
                      locationY={y}
                      handler={placementHandler} />
                  )
                })
            })
        }
      </div>
    )
  }
}

export default Grid
