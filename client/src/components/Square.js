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
  handlePlacement,
  isGame,
  isUnderFire,
  attackHandler
}) => {
  return (
    <div 
      className={
        `square ${value >= 0 && !isGame ? 'square-is-ship' : ''}
        ${isGame && typeof(value) !== 'number' ? 'square-'.concat(value) : ''}
        ${isSelected ? 'selected' : ''}
        ${isAvailable && canPlaceShip ? 'square-is-available' : ''}`
      }
      onClick={() => {
        if (isUnderFire) {
          return attackHandler(locationX, locationY, value)
        }
        if (!isSelected
          && selectedShip !== 0
          && selectedShip !== 1
          && !selectedCoordinates
          && !nearestLocation) {
          return false
        } 
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
