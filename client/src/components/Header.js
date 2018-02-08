import React from 'react'

const Header = ({children, subtitle}) => {
  return (
    <header>
      <h1>{children}</h1>
      { subtitle && <p>{subtitle}</p> }
    </header>
  )
}

export default Header
