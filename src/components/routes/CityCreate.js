import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import CityForm from '../shared/CityForm'
import Layout from '../shared/Layout'

class CityCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: {
        city_name: '',
        city_zip: ''
      },
      createdId: ''
    }
  }

  handleChange = event => {
    // look at the CityForm and take what is inputted from each field
    const inputName = event.target.name
    const inputValue = event.target.value
    // ... refers to all the things in the object
    this.setState({ city: { ...this.state.city, [inputName]: inputValue } })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/cities/`,
      method: 'POST',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      },
      data: {
        city: {
          city_name: this.state.city.city_name,
          city_zip: this.state.city.city_zip
        }
      }
    })
      .then(res => this.setState({ createdId: res.data.city._id }))
      .then(res => console.log(res.data))
      .then(() => this.props.alert({ heading: 'Woot Woot', message: 'You added a city', variant: 'success' }))
      .catch(() => this.props.alert({ heading: 'Something went wrong', message: 'Try again!', variant: 'danger' }))
  }

  render () {
    if (this.state.createdId) {
      return <Redirect to={`/cities/${this.state.createdId}`} />
    }

    return (
      <Layout>
        <CityForm
          city={this.state.city}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          cancelPath="/"
        />
      </Layout>
    )
  }
}

// const CityCreate = props => {
//   const [city, setCity] = useState({ city_name: '', city_zip: '' })
//   const [createdCityId, setCreatedCityId] = useState(null)
//
//   const handleChange = event => {
//     event.persist()
//     // const updatedField = { [event.target.name]: event.target.value }
//     // const editedMovie = Object.assign(movie, updatedField)
//     // setMovie(editedMovie)
//     // The three lines above do the same thing as the line below:s
//     setCity(city => ({ ...city, [event.target.name]: event.target.value }))
//   }
//
//   const handleSubmit = event => {
//     event.persist()
//     event.preventDefault()
//
//     axios({
//       url: `${apiUrl}/cities`,
//       method: 'POST',
//       data: { city }
//     })
//       .then(res => setCreatedCityId(res.data.city.id))
//       .catch(console.error)
//   }
//
//   if (createdCityId) {
//     return <Redirect to={`/cities/${createdCityId}`} />
//   }
//
//   return (
//     <Layout>
//       <CityForm
//         city={city}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         cancelPath="/"
//       />
//     </Layout>
//   )
// }

// Old method without using Hooks:
// class MovieCreate extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       movie: {
//         title: '',
//         director: '',
//         year: ''
//       },
//       createdMovieId: null
//     }
//   }
//
//   handleChange = event => {
//     const updatedField = { [event.target.name]: event.target.value }
//
//     const editedMovie = Object.assign(this.state.movie, updatedField)
//
//     this.setState({ movie: editedMovie })
//   }
//
//   handleSubmit = event => {
//     event.preventDefault()
//
//     axios({
//       url: `${apiUrl}/cities`,
//       method: 'POST',
//       data: { movie: this.state.movie }
//     })
//       .then(res => this.setState({ createdMovieId: res.data.movie.id }))
//       .catch(console.error)
//   }
//
//   render () {
//     const { handleChange, handleSubmit } = this
//     const { createdMovieId, movie } = this.state
//
//     if (createdMovieId) {
//       return <Redirect to={`/cities/${createdMovieId}`} />
//     }
//
//     return (
//       <Layout>
//         <MovieForm
//           movie={movie}
//           handleChange={handleChange}
//           handleSubmit={handleSubmit}
//           cancelPath="/"
//         />
//       </Layout>
//     )
//   }
// }

export default CityCreate
