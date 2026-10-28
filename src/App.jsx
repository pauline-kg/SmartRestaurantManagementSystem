import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CartModal from './components/CartModal/CartModal';

import MenuCatalog from './components/MenuCatalog/MenuCatalog';
import ReservationForm from './components/ReservationForm/ReservationForm';
import AIChat from './components/AIChat/AIChat';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';

import { INITIAL_MENU } from './data/mockData';
import './App.css';
import Navbar from './components/NavBar/NavBar';

// TODO: check if router routes cause any weird full page reloads later
function App() {
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Cart operations
  const addToCart = (item) => {
    console.log("adding item to cart:", item.name);
    
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    const updatedCart = prev => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    };
    setCart(updatedCart);
  };

  const placeOrder = (fulfillmentType) => {
    console.log("placing order with type:", fulfillmentType);

    const newOrder = {
      id: `#ORD-${Date.now().toString().slice(-4)}`,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      type: fulfillmentType,
      status: 'Preparing',
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    alert(`Order ${newOrder.id} placed successfully for ${fulfillmentType}!`);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar 
          cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<MenuCatalog menuItems={menuItems} onAddToCart={addToCart} />} />
            <Route path="/reservations" element={<ReservationForm onAddReservation={(res) => setReservations((prev) => [res, ...prev])} />} />
            <Route path="/ai-assistant" element={<AIChat />} />
            <Route path="/admin" element={
              <AdminDashboard 
                menuItems={menuItems}
                setMenuItems={setMenuItems}
                orders={orders}
                setOrders={setOrders}
                reservations={reservations}
                setReservations={setReservations}
              />
            } />
          </Routes>
        </main>

        {isCartOpen && (
          <CartModal 
            cart={cart} 
            onClose={() => setIsCartOpen(false)} 
            onUpdateQuantity={updateQuantity}
            onCheckout={placeOrder}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
