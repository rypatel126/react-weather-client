import React from 'react'
import { Link } from 'react-router-dom'

const CityForm = ({ city, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>City Name</label>
    <input
      placeholder="Boston"
      value={city.city_name}
      name="city_name"
      onChange={handleChange}
    />

    <label>City Zipcode</label>
    <input
      placeholder="02130"
      value={city.city_zip}
      name="city_zip"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default CityForm
