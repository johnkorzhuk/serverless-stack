import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

import './App.css'
import config from './config.js'

import Routes from './Routes'
import { RouteNavItem } from './components/index'

class App extends Component {
  state = {
    userToken: null,
    isLoadingUserToken: true
  };

  async componentWillMount () {
    const currentUser = this.getCurrentUser()

    if (currentUser === null) {
      this.setState({ isLoadingUserToken: false })
      return
    }

    try {
      const userToken = await this.getUserToken(currentUser)
      this.updateUserToken(userToken)
    } catch (e) {
      console.error(e)
    }

    this.setState({ isLoadingUserToken: false })
  }

  getCurrentUser () {
    const userPool = new CognitoUserPool({
      UserPoolId: config.cognito.USER_POOL_ID,
      ClientId: config.cognito.APP_CLIENT_ID
    })

    return userPool.getCurrentUser()
  }

  getUserToken (currentUser) {
    return new Promise((resolve, reject) => {
      currentUser.getSession(function (err, session) {
        err ? reject(err) : resolve(session.getIdToken().getJwtToken())
      })
    })
  }

  handleNavLink = event => {
    event.preventDefault()
    this.props.history.push(event.currentTarget.getAttribute('href'))
  };

  handleLogout = event => {
    const currentUser = this.getCurrentUser()

    if (currentUser !== null) currentUser.signOut()

    this.updateUserToken(null)
  };

  updateUserToken = userToken => {
    this.setState({
      userToken
    })
  };

  render () {
    const childProps = {
      userToken: this.state.userToken,
      updateUserToken: this.updateUserToken
    }

    return !this.state.isLoadingUserToken &&
      <div className='App container'>
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/'>Scratch</Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.userToken
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [
                  <RouteNavItem
                    key={1}
                    onClick={this.handleNavLink}
                    href='/signup'
                    >
                      Signup
                    </RouteNavItem>,
                  <RouteNavItem
                    key={2}
                    onClick={this.handleNavLink}
                    href='/login'
                    >
                      Login
                    </RouteNavItem>
                ]}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Routes childProps={childProps} />
      </div>
  }
}

export default withRouter(App)
