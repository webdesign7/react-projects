import React from 'react';
import './Header.css';
import logo from '../assets/logo.jpg';

function Header({ cartCount, onCartClick }) {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="header__nav">
        <button type="button" className="header__cart" onClick={onCartClick}>
          Cart <span className="header__cart-count">{cartCount}</span>
        </button>
      </nav>
    </header>
  );
}

export default Header; 