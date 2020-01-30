import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import ListGroup from 'react-bootstrap/ListGroup'
import '../../index.scss'

import apiUrl from '../../apiConfig'

const apiKey = 'a6047cbf25b75afc13e72ba457a05846'
const weatherApi = 'http://api.openweathermap.org/data/2.5/weather?zip='

class City extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: null,
      // data is what will come back from weather api
      data: null
    }
    // console.log('city props are:', this.props)
    // console.log('test 1')
  }

  componentDidMount () {
    let city
    // console.log('city in state is:', this.state.city)
    // console.log('data in state is:', this.state.data)
    // console.log('City componentDidMount')
    // console.log('City Props are:' + this.props)
    axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      // .then(res => {
      //   this.setState({ city: res.data.city })
      //   console.log('after get request state is:', this.state.city.city_zip)
      // })
      .then(res => {
        city = res.data.city
        return axios({
          url: `${weatherApi}` + `${city.city_zip},us` + '&units=imperial&APPID=' + `${apiKey}`,
          method: 'GET'
        })
          .then(res => {
            this.setState({
              data: res.data,
              city: city
            })
            // console.log('after get request data state is:', this.state.data)
          })
          .catch(console.error)
      })
      .catch(console.error)
    // axios GET request to third party weather API
    // axios({
    //   url: `${weatherApi}` + `${this.state.city.city_zip},us` + '&APPID=' + `${apiKey}`,
    //   method: 'GET'
    // })
    //   .then(res => {
    //     this.setState({ data: res.data })
    //     console.log('after get request data state is:', this.state.data)
    //   })
    //   .catch(console.error)
  }

  handleDelete = () => {
    event.preventDefault()

    const { alert } = this.props
    // console.log('test 3')
    axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.props.user.token}`
      }
    })
    // sends user back to home after book has been deleted:
      .then(this.props.history.push('/'))
      .then(() => alert({
        heading: 'You deleted a city',
        message: messages.success,
        variant: 'success'
      }))
      .catch(error => {
        console.error(error)
        alert({
          heading: 'Error',
          message: messages.failure,
          variant: 'danger'
        })
      })
  }

  render () {
    // console.log('test 4')
    if (!this.state.city) {
      // console.log('No city to show')
      return <p>Loading...If this message persists for more than a few seconds, please return to Home and try again</p>
    }

    return (
      <Layout>
        <div>
          <h3 className="city-name">City: {this.state.city.city_name}</h3>
          <h5>Zipcode: {this.state.city.city_zip}</h5>
          <Link className="btn btn-dark" to={`/cities/${this.props.match.params.id}/edit`}>Edit</Link>
          <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
          <ListGroup variant="flush" className="city-list">
            <ListGroup.Item className="weather-data">Weather Data:</ListGroup.Item>
            <ListGroup.Item>Current Status: {this.state.data.weather[0].main}</ListGroup.Item>
            <ListGroup.Item>Description: {this.state.data.weather[0].description}</ListGroup.Item>
            <ListGroup.Item>Temperature (Fahrenheit): {this.state.data.main.temp}</ListGroup.Item>
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </div>
      </Layout>
    )
  }
}

// {this.props.user && (this.props.user.id === this.state.city.owner.id) &&
//         (
//           <div>
//   <Link className="btn btn-primary" to={`/cities/${this.props.match.params.id}/edit`}>Edit</Link>
//   <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
// </div>
//         )}

export default City
