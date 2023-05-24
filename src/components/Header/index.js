import React from 'react';

import Filter from '../Filter';
import './header.css';

function Header() {
    return (
        <header className="App-header">
            <h1>Pokedex</h1>
            <Filter />
        </header>

    )
}

export default Header;