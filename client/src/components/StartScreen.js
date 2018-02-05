import React from 'react'
import { START_SCREEN } from '../constants'

const StartScreen = ({handler}) => {
  return (
    <div className='start-screen'>
      <header>
        <h1>REACT BATTLESHIP</h1>
        <p>Built by Matt Carpowich</p>
      </header>
      <button className='btn'
        onClick={handler}>
        START
      </button>
    </div>
  )
}

export default StartScreen
