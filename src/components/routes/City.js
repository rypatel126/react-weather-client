import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from '../shared/Layout'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'

class City extends Component {
  constructor (props) {
    super(props)

    this.state = {
      city: null
    }
    // console.log('city props are:', this.props)
    // console.log('test 1')
  }

  componentDidMount () {
    // console.log('test 2')
    // console.log('City componentDidMount')
    // console.log('City Props are:' + this.props)
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

  handleDelete = () => {
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
      return <p>Loading...</p>
    }

    return (
      <Layout>
        <div>
          {/* {this.state.book ? this.state.book.title : 'No book found'} */}
          <h2>{this.state.city.city_name}</h2>
          <Link className="btn btn-primary" to={`/cities/${this.props.match.params.id}/edit`}>Edit</Link>
          <button className="btn btn-danger" onClick={this.handleDelete}>Delete</button>
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
