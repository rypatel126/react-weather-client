import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav>
    <Link to="/">Home Page</Link>
    <Link to="/cities">Your Cities</Link>
    <Link to="/create-cities">Add a City</Link>
  </nav>
)

export default Nav
