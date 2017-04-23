import React from 'react'
import { Route, Switch } from 'react-router-dom'

import {
  Home,
  NotFound,
  Login,
  Signup,
  NewNote,
  Notes
} from './containers/index'
import {
  AppliedRoute,
  AuthenticatedRoute,
  UnauthenticatedRoute
} from './components/index'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />

    <UnauthenticatedRoute
      path='/login'
      exact
      component={Login}
      props={childProps}
    />

    <UnauthenticatedRoute
      path='/signup'
      exact
      component={Signup}
      props={childProps}
    />

    <AuthenticatedRoute
      path='/notes/new'
      exact
      component={NewNote}
      props={childProps}
    />

    <AuthenticatedRoute
      path='/notes/:id'
      exact
      component={Notes}
      props={childProps}
    />

    <Route component={NotFound} />
  </Switch>
)
