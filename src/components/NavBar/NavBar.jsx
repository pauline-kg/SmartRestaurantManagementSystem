import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

// TODO: check if mobile nav breaks on smaller screen sizes later
function Navbar({ cartCount, onOpenCart }) {
  
  const handleCartClick = () => {
    console.log("Opening cart modal, current items count:", cartCount);
    onOpenCart();
  };

  return (
    <header className="navbar">
      <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>
        🍽️ Smart Restaurant Management System
      </Link>

      {/* main navigation links using react-router-dom */}
      <nav className="navbar-links">
        <Link to="/" className="nav-btn">Menu</Link>
        <Link to="/reservations" className="nav-btn">Reservations</Link>
        <Link to="/ai-assistant" className="nav-btn">🤖 AI Assistant</Link>
        <Link to="/admin" className="nav-btn">Admin Dashboard</Link>
      </nav>

      <button className="cart-badge-btn" onClick={handleCartClick}>
        🛒 Cart ({cartCount})
      </button>
    </header>
  );
}

export default Navbar;
