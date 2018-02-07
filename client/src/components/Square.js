import React from 'react'

const Square = ({
  locationX,
  locationY,
  value,
  isSelected,
  selectedShip,
  selectedCoordinates,
  nearestLocation,
  handleSelect,
  isAvailable,
  canPlaceShip,
  handlePlacement
}) => {
  return (
    <div 
      className={
        `square ${value >= 0 ? 'square-is-ship' : ''}
        ${isSelected ? 'selected' : ''}
        ${isAvailable && canPlaceShip ? 'square-is-available' : ''}`
      }
      onClick={() => { 
        if (selectedShip < 0) {
          return value >= 0
          ? handleSelect(nearestLocation[0], nearestLocation[1], value) : false
        } else {
          if (locationX === selectedCoordinates[0]
            && locationY === selectedCoordinates[1]) {
            return handleSelect(locationX, locationY, value)
          } else if (value >= 0
            && value !== selectedShip) {
            return handleSelect(nearestLocation[0], nearestLocation[1], value)
          } else {
            return handlePlacement(locationX, locationY)
          }
        }
      }} />
  )
}

export default Square
