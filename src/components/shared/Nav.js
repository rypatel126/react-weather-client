import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => (
  <nav>
    <Link to="/">Home Page</Link>
  </nav>
)

// These have been moved to the header folder so they will only be shown after login
// <Link to="/cities">Your Cities</Link>
// <Link to="/create-city">Add a City</Link>

export default Nav
