import React from 'react'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CityForm = ({ city, handleSubmit, handleChange, cancelPath }) => (
  // <form onSubmit={handleSubmit}>
  //   <label>City Name</label>
  //   <input
  //     placeholder="Boston"
  //     value={city.city_name}
  //     name="city_name"
  //     onChange={handleChange}
  //     type='text'
  //     required
  //   />
  //
  //   <label>City Zipcode</label>
  //   <input
  //     placeholder="02130"
  //     value={city.city_zip}
  //     name="city_zip"
  //     onChange={handleChange}
  //     type='text'
  //     required
  //   />
  //
  //   <button type="submit">Submit</button>
  //   <Link to={cancelPath}>
  //     <button>Cancel</button>
  //   </Link>
  // </form>
  <Form onSubmit={handleSubmit}>
    <Form.Group>
      <Form.Label>City Name</Form.Label>
      <Form.Control
        placeholder="Jamaica Plain"
        value={city.city_name}
        name="city_name"
        onChange={handleChange}
        type='text'
        required
      />
    </Form.Group>

    <Form.Group>
      <Form.Label>Zipcode</Form.Label>
      <Form.Control
        placeholder="02130"
        value={city.city_zip}
        name="city_zip"
        onChange={handleChange}
        type='text'
        required
      />
    </Form.Group>
    <Form.Text className="text-muted">
      Please enter a valid 5 digit zip code (US only)
    </Form.Text>
    <Button variant="primary" type="submit">
      Submit
    </Button>
    <Link to={cancelPath}>
      <Button variant="secondary" type="submit">
        Cancel
      </Button>
    </Link>
  </Form>
)

export default CityForm
