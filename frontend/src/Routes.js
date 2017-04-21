import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './containers/Home/Home'
import NotFound from './containers/NotFound/NotFound'
import Login from './containers/Login/Login'
import AppliedRoute from './components/AppliedRoute/AppliedRoute'

export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path='/' exact component={Home} props={childProps} />
    <AppliedRoute path='/login' exact component={Login} props={childProps} />
    <Route component={NotFound} />
  </Switch>
)
