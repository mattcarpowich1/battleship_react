import React from 'react'
import Header from './Header.js'

const StartScreen = ({handler}) => {
  const subtitle = 'Built by Matt Carpowich'
  return (
    <div className='start-screen'>
      <Header subtitle={subtitle}>
        REACT BATTLESHIP
      </Header>
      <button className='btn'
        onClick={handler}>
        START
      </button>
    </div>
  )
}

export default StartScreen
