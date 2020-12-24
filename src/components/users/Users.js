import React, { Component } from 'react'
import UserItem from './UserItem'
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner'


const Users = ({users, loading}) => {
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

Users.propTypes = {
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default Users;
