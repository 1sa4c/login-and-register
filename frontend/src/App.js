import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css'

import Landing from './pages/Landing'
import Register from './pages/Register'
import Login from './pages/Login'
import Forgot from './pages/Forgot'
import Reset from './pages/Reset'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path='/' component={Landing}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
        <Route path='/forgot' component={Forgot}/>
        <Route path='/reset/:token' component={Reset}/>
        <Route path='/dashboard' component={Dashboard}/>
      </BrowserRouter>
    </div>
  )
}

export default App
