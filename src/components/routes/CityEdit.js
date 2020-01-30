import React, { Component } from 'react'
import CityForm from '../shared/CityForm'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import { Redirect } from 'react-router-dom'
import Layout from '../shared/Layout'

class CityEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: {
        city_name: '',
        city_zip: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${this.props.user.token}`
      }
    })
      .then(res => {
        this.setState({ city: res.data.city })
      })
      .catch(console.error)
  }

  handleChange = event => {
    // look at the BookForm and take what is inputted from each field
    const inputName = event.target.name
    const inputValue = event.target.value
    // ... refers to all the things in the object
    this.setState({ city: { ...this.state.city, [inputName]: inputValue } })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/cities/${this.props.match.params.id}`,
      method: 'PATCH',
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
      .then(res => this.setState({ updated: true }))
      .then(() => this.props.alert({ heading: 'Success!', message: 'You updated your city', variant: 'success' }))
      .catch(() => this.props.alert({ heading: 'Something went wrong', message: 'Try again!', variant: 'danger' }))
  }

  render () {
    if (this.state.updated) {
      return <Redirect to={`/cities/${this.props.match.params.id}`} />
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

export default CityEdit
