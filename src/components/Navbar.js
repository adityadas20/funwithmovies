import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    render() {
        return (
            <div className="navbar-icons">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <h1>Movies App</h1>
                </Link>
                <Link to="/favourites" style={{ textDecoration: 'none' }}>
                    <h1>Favourites</h1>
                </Link>
            </div>
        )
    }
}
