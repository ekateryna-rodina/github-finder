import './App.css';
import React, { Component } from 'react';
import Navbar from './components/layout/Navbar'
import UserItem from './components/users/UserItem'
import Users from './components/users/Users'
import axios from 'axios'
import Search from './components/users/Search'
import Alert from './components/layout/Alert';



class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null
}

  async componentDidMount(){
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/users?client_id=
          ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data, loading: false})
  }

  searchUsers = async text =>{
    this.setState({loading: true})
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
    ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({users: res.data.items, loading: false})
  }

  clearUsers =() => {
    this.setState({users: [], loading: false})
  }

  showAlert = ({msg, type} = alert) => {
    this.setState({alert: {msg: msg, type: type}})
    setTimeout(() => {this.setState({alert: null})}, 5000)
  }
   render() {
     const {users, loading} = this.state;
     return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Alert alert={this.state.alert}/>
          <Search 
            searchUsers={this.searchUsers} 
            clearUsers={this.clearUsers} 
            showClear={users.length > 0}
            showAlert={this.showAlert}/>
          <Users users={users} loading={loading}/>
        </div>
      </div>
     )};
} 
export default App;
