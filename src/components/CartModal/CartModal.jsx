import React, { useState } from 'react';
import './CartModal.css';

export default function CartModal({ cart, onClose, onUpdateQuantity, onCheckout }) {
  const [fulfillment, setFulfillment] = useState('Delivery');

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="modal-backdrop">
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Your Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is currently empty.</p>
        ) : (
          <div className="cart-body">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div>
                    <h4>{item.name}</h4>
                    <p>${item.price.toFixed(2)}</p>
                  </div>
                  <div className="quantity-controls">
                    <button onClick={() => onUpdateQuantity(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)}>+</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="fulfillment-selector">
              <label>
                <input 
                  type="radio" 
                  value="Delivery" 
                  checked={fulfillment === 'Delivery'} 
                  onChange={(e) => setFulfillment(e.target.value)} 
                /> 🚚 Delivery
              </label>
              <label>
                <input 
                  type="radio" 
                  value="Pickup" 
                  checked={fulfillment === 'Pickup'} 
                  onChange={(e) => setFulfillment(e.target.value)} 
                /> 🏃 Pickup
              </label>
            </div>

            <div className="cart-footer">
              <div className="total-row">
                <span>Total:</span>
                <span className="total-price">${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={() => onCheckout(fulfillment)}>
                Confirm Order
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}