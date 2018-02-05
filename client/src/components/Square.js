import React from 'react'

const Square = ({status}) => {
  return (
    <div className={`square square-${status}`} />
  )
}

export default Square
