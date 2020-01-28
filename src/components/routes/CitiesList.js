import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

class Cities extends Component {
  constructor (props) {
    super(props)

    this.state = {
      cities: []
    }
  }

  componentDidMount () {
    // console.log('componentDidMount')
    // console.log('props info:', this.props)
    // console.log('user info:', this.props.user)
    // console.log('axios request has started')
    axios({
      url: `${apiUrl}/cities`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then((res) => {
        this.setState({ cities: res.data.cities })
        // console.log(res.data)
      })
      .catch(console.error)
    // console.log('axios request completed')
  }

  render () {
    console.log('render started')
    let citiesJsx = ''

    if (!this.state.cities.length) {
      citiesJsx = <p>Loading...</p>
      console.log('no cities to display')
    } else {
      console.log('cities are being shown')
      citiesJsx = this.state.cities.map(city => (
        <li key={city.id}>
          <Link to={`/cities/${city.id}`}>{city.city_name}</Link>
        </li>
      )
      )
      console.log('state is', this.state)
    }

    return (
      <Layout>
        <h4>Cities</h4>
        <ul>
          {citiesJsx}
        </ul>
      </Layout>
    )
  }
}

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
