import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { Home, NotFound, Login, Signup, NewNote } from './containers/index'
import { AppliedRoute } from './components/index'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <AppliedRoute path='/signup' exact component={Signup} props={childProps} />
    <AppliedRoute
      path='/notes/new'
      exact
      component={NewNote}
      props={childProps}
    />
    <Route component={NotFound} />
  </Switch>
)
