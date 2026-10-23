import React, { useState } from 'react';
import Navbar from './components/NavBar/NavBar';
import MenuCatalog from './components/MenuCatalog/MenuCatalog';
import CartModal from './components/CartModal/CartModal';
import ReservationForm from './components/ReservationForm/ReservationForm';
import AIChat from './components/AIChat/AIChat';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import { INITIAL_MENU } from './data/mockData';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('menu');
  const [menuItems, setMenuItems] = useState(INITIAL_MENU);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  // Cart operations
  const addToCart = (item) => {
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
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const placeOrder = (fulfillmentType) => {
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
    <div className="app-container">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="main-content">
        {activeTab === 'menu' && (
          <MenuCatalog menuItems={menuItems} onAddToCart={addToCart} />
        )}
        {activeTab === 'reservations' && (
          <ReservationForm onAddReservation={(res) => setReservations((prev) => [res, ...prev])} />
        )}
        {activeTab === 'ai' && <AIChat />}
        {activeTab === 'admin' && (
          <AdminDashboard 
            menuItems={menuItems}
            setMenuItems={setMenuItems}
            orders={orders}
            setOrders={setOrders}
            reservations={reservations}
            setReservations={setReservations}
          />
        )}
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
  );
}