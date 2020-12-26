import './App.css';
import React, { useEffect, useState, Fragment } from 'react';
import Navbar from './components/layout/Navbar'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import About from './components/pages/About';
import User from './components/users/User'

const App = () => {

// manage state
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos]  = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
// preload users
  useEffect(async () => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users?client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data);
    setLoading(false);
}, []);
// searh user
  const searchUsers = async text => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data.items);
    setLoading(false);
  }
// reset users
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }
// show alert
  const showAlert = ({msg, type} = alert) => {
    setAlert({msg: msg, type: type});
    setTimeout(() => {setAlert(null);}, 5000)
  }
  // get single user
  const getUser = async(username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUser(res.data);
    setLoading(false);
  }
  // get users repos
  const getUserRepos = async(username) => {
    setLoading(true)
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data);
    setLoading(false);
  }
     return (
       <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={alert}/>
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                  <Search 
                    searchUsers={searchUsers} 
                    clearUsers={clearUsers} 
                    showClear={users.length > 0}
                    showAlert={showAlert}/>
                  <Users users={users} loading={loading}/>
                </Fragment>
            )}/>
            <Route exact path='/about' component={About}></Route>
            <Route exact path='/user/:login' render={props => (
              <User 
                {...props} 
                getUser={getUser} 
                user={user} 
                getUserRepos={getUserRepos} 
                loading={loading} 
                repos={repos}>
              </User>
            )}>
            </Route>
          </Switch>
        </div>
      </div>
      </Router>
     )} 
export default App;
