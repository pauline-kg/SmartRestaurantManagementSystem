import React from 'react';
import './Navbar.css';

export default function Navbar({ activeTab, setActiveTab, cartCount, onOpenCart }) {
  return (
    <header className="navbar">
      <div className="navbar-logo" onClick={() => setActiveTab('menu')}>
        🍽️ Savory Bistro
      </div>
      <nav className="navbar-links">
        <button 
          className={activeTab === 'menu' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>
        <button 
          className={activeTab === 'reservations' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('reservations')}
        >
          Reservations
        </button>
        <button 
          className={activeTab === 'ai' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('ai')}
        >
          🤖 AI Assistant
        </button>
        <button 
          className={activeTab === 'admin' ? 'nav-btn active' : 'nav-btn'} 
          onClick={() => setActiveTab('admin')}
        >
          Admin Dashboard
        </button>
      </nav>
      <button className="cart-badge-btn" onClick={onOpenCart}>
        🛒 Cart ({cartCount})
      </button>
    </header>
  );
}