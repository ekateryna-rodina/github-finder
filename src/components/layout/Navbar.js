import React, { Component } from 'react'
import PropTypes from 'prop-types'

const Navbar = ({icon, title}) =>  {
    return (
        <nav className='navbar bg-primary'>
            <h4><i className={icon}></i> {title}</h4> 
        </nav>
    )
}
Navbar.defaultProps = {
    title: 'Github Finder',
    icon: 'fab fa-github'
};

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

export default Navbar
