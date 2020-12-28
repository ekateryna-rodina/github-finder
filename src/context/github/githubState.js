import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import { SEARCH_USERS, GET_USER, GET_REPOS, CLEAR_USERS, SET_LOADING, GET_USERS} from '../types';

const GithubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [], 
        loading: false
        }
    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // preload users
    const getUsers = async () => {
        setLoading();
        const res = await axios.get(`https://api.github.com/users?client_id=
              ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        
        dispatch({
            type: GET_USERS,
            payload: res.data
        });
    }

    // searh user
    const searchUsers = async text => {
        setLoading();
        const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: SEARCH_USERS,
            payload: res.data.items
        });
    }

    // reset users
    const clearUsers = () => {
        dispatch({type: CLEAR_USERS});
    }

    const setLoading = () => {
        dispatch({type: SET_LOADING});
    }

     // get single user
    const getUser = async(username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}?client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        dispatch({
            type: GET_USER,
            payload: res.data
        })
    }

      // get users repos
    const getUserRepos = async(username) => {
        setLoading()
        const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=
            ${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

        dispatch({
            type: GET_REPOS,
            payload: res.data
        })
    }

    return <GithubContext.Provider value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        clearUsers,
        searchUsers,
        getUser,
        getUserRepos,
        getUsers
    }}>
    {props.children}
    </GithubContext.Provider>
    }

export default GithubState;