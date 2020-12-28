import './App.css';
import React, { useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import Search from './components/users/Search'
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/githubState';
import AlertState from './context/alert/alertState';

const App = () => {
     return (
       <GithubState>
         <AlertState>
       <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                  <Search/>
                  <Users/>
                </Fragment>
            )}/>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/user/:login' component={User}>
            </Route>
          </Switch>
        </div>
      </div>
      </Router>
      </AlertState>
      </GithubState>
     )} 
export default App;
