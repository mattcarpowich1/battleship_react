import React from 'react'

const StartScreen = ({handler}) => {
  return (
    <div className='start-screen'>
      <h1>2-Player Battleship</h1>
      <p>React Implementation of Battleship by Matt Carpowich</p>
      <button onClick={handler}>START GAME</button>
    </div>
  )
}

export default StartScreen
