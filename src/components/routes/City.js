import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'
import ListGroup from 'react-bootstrap/ListGroup'
import '../../index.scss'
import Spinner from 'react-bootstrap/Spinner'

import apiUrl from '../../apiConfig'

const apiKey = 'a6047cbf25b75afc13e72ba457a05846'
const weatherApi = 'https://api.openweathermap.org/data/2.5/weather?zip='

class City extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: null,
      // data is what will come back from weather api
      data: null
    }
  }

  componentDidMount () {
    let city
    axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
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
    if (!this.state.city) {
      return (
        <Layout>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Spinner animation="grow" className="loading-spinner"/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Link className="btn btn-dark" to={`/cities/${this.props.match.params.id}/edit`}>Searching for zip code, if this message persists for more than 5 seconds please double check you are using a valid 5-digit US zip code and click this message to edit the city information</Link>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <button className="btn btn-danger" onClick={this.handleDelete}>Delete this city</button>
          </div>
        </Layout>
      )
    } else {
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
            </ListGroup>
          </div>
        </Layout>
      )
    }
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
