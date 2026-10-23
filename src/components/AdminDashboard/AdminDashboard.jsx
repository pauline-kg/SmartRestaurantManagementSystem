import React, { useState } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard({ menuItems, setMenuItems, orders, setOrders, reservations, setReservations }) {
  const [activeTab, setActiveTab] = useState('menu');
  const [newItem, setNewItem] = useState({ name: '', category: 'mains', price: '', description: '', ingredients: '' });

  // Menu Operations
  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      ...newItem,
      id: Date.now(),
      price: parseFloat(newItem.price),
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop"
    };
    setMenuItems([...menuItems, item]);
    setNewItem({ name: '', category: 'mains', price: '', description: '', ingredients: '' });
  };

  const handleDeleteItem = (id) => {
    setMenuItems(menuItems.filter((i) => i.id !== id));
  };

  // Status updates
  const updateOrderStatus = (id, newStatus) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  const updateReservationStatus = (id, newStatus) => {
    setReservations(reservations.map((r) => (r.id === id ? { ...r, status: newStatus } : r)));
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      
      <div className="admin-tabs">
        <button className={activeTab === 'menu' ? 'active' : ''} onClick={() => setActiveTab('menu')}>Menu CRUD</button>
        <button className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders ({orders.length})</button>
        <button className={activeTab === 'reservations' ? 'active' : ''} onClick={() => setActiveTab('reservations')}>Reservations ({reservations.length})</button>
      </div>

      {activeTab === 'menu' && (
        <div className="admin-section">
          <h3>Add New Menu Item</h3>
          <form onSubmit={handleAddItem} className="add-item-form">
            <input type="text" placeholder="Name" required value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} />
            <select value={newItem.category} onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}>
              <option value="starters">Starter</option>
              <option value="mains">Main</option>
              <option value="desserts">Dessert</option>
              <option value="beverages">Beverage</option>
            </select>
            <input type="number" step="0.01" placeholder="Price" required value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} />
            <input type="text" placeholder="Description" required value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} />
            <button type="submit">Add Item</button>
          </form>

          <h3>Current Menu Items</h3>
          <ul className="admin-list">
            {menuItems.map((item) => (
              <li key={item.id}>
                <span><strong>{item.name}</strong> (${item.price.toFixed(2)}) - <em>{item.category}</em></span>
                <button onClick={() => handleDeleteItem(item.id)} className="delete-btn">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="admin-section">
          <h3>Customer Orders</h3>
          {orders.length === 0 ? <p>No orders submitted yet.</p> : (
            <ul className="admin-list">
              {orders.map((order) => (
                <li key={order.id} className="order-item">
                  <div>
                    <strong>{order.id}</strong> - {order.type} (${order.total.toFixed(2)})
                    <p className="order-status-text">Status: {order.status}</p>
                  </div>
                  <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === 'reservations' && (
        <div className="admin-section">
          <h3>Table Reservations</h3>
          {reservations.length === 0 ? <p>No reservations submitted yet.</p> : (
            <ul className="admin-list">
              {reservations.map((res) => (
                <li key={res.id}>
                  <div>
                    <strong>{res.name}</strong> ({res.guests} guests) - {res.date} at {res.time} [{res.eventType}]
                    <p>Status: {res.status}</p>
                  </div>
                  <div>
                    <button onClick={() => updateReservationStatus(res.id, 'Approved')} className="approve-btn">Approve</button>
                    <button onClick={() => updateReservationStatus(res.id, 'Cancelled')} className="delete-btn">Cancel</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}