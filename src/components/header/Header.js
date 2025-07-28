import React from 'react';
import './header.css'; 

const Header = () => {
  return (
    <header className="header">
      <img src="/logo.png" alt="Header logo" className="logo" />
      <nav className="header-nav">
        <a href="/about" className="header-link">About</a>
      </nav>
    </header>
  );
};

export default Header;
