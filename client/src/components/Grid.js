import React, { Component } from 'react'
import Square from './Square.js'
import { generateNewGrid } from '../../utils'

class Grid extends Component {
  constructor () {
    super()
    this.state = {
      coordinates: []
    }
  }

  componentWillMount () {
    const { size } = this.props
    this.setState({
      coordinates: generateNewGrid(size)
    })
  }

  render () {
    return (
      <div className='grid'>
        {
          this.state.coordinates
            .map((row, yVal) => {
              return row
                .map((status, xVal) => {
                  return (
                    <Square status={status}
                      key={`${xVal},${yVal}`} />
                  )
                })
            })
        }
      </div>
    )
  }
}

export default Grid
