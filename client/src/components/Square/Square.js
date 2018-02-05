import React from 'react'
import './Square.css'

const Square = ({status}) => {
  return (
    <div className={`square square-${status}`} />
  )
}

export default Square
