import React from 'react'
import { Route, IndexRoute } from 'react-router'

import App from '../components/App'
import Home from '../components/home/Home'
import Login from '../components/login/Login'
import Signup from '../components/signup/Signup'
import Error404 from '../components/error404/Error404'


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home}/>
    <Route path='/login' component={Login}/>
    <Route path='/signup' component={Signup}/>
    <Route path="*" component={Error404}/>
  </Route>
)
