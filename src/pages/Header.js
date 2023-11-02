// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Wild Horizon Safari</h1>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/game-info">Game Info</Link>
                <Link to="/store">Store</Link>
            </nav>
        </header>
    );
}

export default Header;
