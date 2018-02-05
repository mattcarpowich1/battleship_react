import React, { Component } from 'react'
import Square from './Square.js'

class Grid extends Component {
  render () {
    return (
      <div className='grid'>
        {
          this.props.coordinates
            .map((row, y) => {
              return row
                .map((status, x) => {
                  return (
                    <Square key={`${x},${y}`}
                      status={status}
                      locationX={x}
                      locationY={y} />
                  )
                })
            })
        }
      </div>
    )
  }
}

export default Grid
