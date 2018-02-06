import React from 'react'

const Square = ({
  locationX,
  locationY,
  status, 
  selected,
  toggle,
  open,
  handler
}) => {
  return (
    <div 
      className={
        `square square-${status} 
        ${selected ? 'selected' : ''}`
      }
      onClick={() => handler ? handler(locationX, locationY) : false} />
  )
}

export default Square
