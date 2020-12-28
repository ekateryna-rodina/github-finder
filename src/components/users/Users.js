import React, { Component, useContext, useEffect } from 'react'
import UserItem from './UserItem'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'
import GithubContext from '../../context/github/githubContext'


const Users = () => {
    const githubContext = useContext(GithubContext);
    const {loading, users, getUsers} = githubContext;
    // preload users
    useEffect(async () => {
        getUsers();
    }, []);

    if (loading){
        return (<Spinner></Spinner>)
    } else {
        return (
            <div style={usersStyle}>
                {users.map(user => (
                    <UserItem key={user.id} user={user}></UserItem>
                ))}
            </div>
            )
    }
}

const usersStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem'
}

export default Users;
