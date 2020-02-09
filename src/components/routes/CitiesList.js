import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
import ListGroup from 'react-bootstrap/ListGroup'
import '../../index.scss'

class Cities extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cities: []
    }
  }

  componentDidMount () {
    const { alert } = this.props
    axios({
      url: `${apiUrl}/cities`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ cities: res.data.cities })
        alert({
          heading: 'Cities are listed above!',
          message: 'Click on a city to view some weather data',
          variant: 'success'
        })
        // console.log(res.data)
      })
      .catch(error => {
        console.error(error)
        alert({
          heading: 'Failed to load cities',
          message: messages.failure,
          variant: 'danger'
        })
      })
    // console.log('axios request completed')
  }

  // handleDelete = () => {
  //   event.preventDefault()
  //
  //   const { alert } = this.props
  //   // console.log('test 3')
  //   axios({
  //     url: `${apiUrl}/cities/${this.props.match.params.id}`,
  //     method: 'DELETE',
  //     headers: {
  //       'Authorization': `Bearer ${this.props.user.token}`
  //     }
  //   })
  //   // sends user back to home after book has been deleted:
  //     .then(this.props.history.push('/'))
  //     .then(() => alert({
  //       heading: 'You deleted a city',
  //       message: messages.success,
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       console.error(error)
  //       alert({
  //         heading: 'Error',
  //         message: messages.failure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  render () {
    // console.log('render started')
    let citiesJsx = ''

    if (!this.state.cities.length) {
      citiesJsx = <p>No cities to display, please add a city using the Add City button at the top right of the screen</p>
      // console.log('no cities to display')
    } else {
      // console.log('cities are being shown')
      citiesJsx = this.state.cities.map(city => (
        <ListGroup key={city.id}>
          <ListGroup.Item variant="flush">
            <Link to={`/cities/${city.id}`}>{city.city_name}</Link>
          </ListGroup.Item>
        </ListGroup>
      )
      )
      // console.log('state is', this.state)
    }

    return (
      <Layout>
        <h4>Your Cities</h4>
        <div className="city-list">
          {citiesJsx}
        </div>
      </Layout>
    )
  }
}

// <ListGroup>
//   <ListGroup.Item variant="info">{citiesJsx}</ListGroup.Item>
// </ListGroup>

// const Cities = props => {
//   const [cities, setCities] = useState([])
//
//   useEffect(() => {
//     axios(`${apiUrl}/cities`)
//       .then(res => setCities(res.data.cities))
//       .catch(console.error)
//   }, [])
//
//   const showCities = cities.map(city => (
//     <li key={city.id}>
//       <Link to={`/cities/${city.id}`}>{city.city_name}</Link>
//     </li>
//   ))
//
//   return (
//     <Layout>
//       <h4>Cities</h4>
//       <ul>
//         {showCities}
//       </ul>
//     </Layout>
//   )
// }

// old method (doesn't use Hooks)
// class Movies extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       movies: []
//     }
//   }
//
//   componentDidMount () {
//     axios(`${apiUrl}/movies`)
//       .then(res => this.setState({ movies: res.data.movies }))
//       .catch(console.error)
//   }
//
//   render () {
//     const movies = this.state.movies.map(movie => (
//       <li key={movie.id}>
//         <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
//       </li>
//     ))
//
//     return (
//       <Layout>
//         <h4>Movies</h4>
//         <ul>
//           {movies}
//         </ul>
//       </Layout>
//     )
//   }
// }

export default Cities
