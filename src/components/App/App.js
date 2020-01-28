import React, { Component, Fragment } from 'react'
import { Route, withRouter } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Home from '../routes/Home'
import CityCreate from '../routes/CityCreate'
import Cities from '../routes/CitiesList'
import City from '../routes/City'
import CityEdit from '../routes/CityEdit'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = ({ heading, message, variant }) => {
    this.setState({ alerts: [...this.state.alerts, { heading, message, variant }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AutoDismissAlert
            key={index}
            heading={alert.heading}
            variant={alert.variant}
            message={alert.message}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
          <Route exact path='/' component={Home} />
          <AuthenticatedRoute user={user} path='/create-city' render={() => (
            <CityCreate alert={this.alert} user={user} />
          )} />
          <Route exact path='/cities' render={() => (
            <Cities alert={this.alert} user={user} />
          )} />
          <Route exact path='/cities/:id' render={(props) => (
            <City user={user} match={props.match} history={props.history} />
          )} />
          <AuthenticatedRoute user={user} exact path='/books/:id/edit' render={({ match }) => (
            <CityEdit match={match} alert={this.alert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default withRouter(App)
