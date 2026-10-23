import React from 'react';

export default function FoodCard({ item, onAddToCart }) {
  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} className="food-card-img" />
      <div className="food-card-body">
        <div className="food-card-header">
          <h3>{item.name}</h3>
          <span className="food-price">${item.price.toFixed(2)}</span>
        </div>
        <p className="food-desc">{item.description}</p>
        <p className="food-ingredients"><strong>Ingredients:</strong> {item.ingredients}</p>
        <div className="food-tags">
          {item.isVegetarian && <span className="tag veg">Vegetarian</span>}
          {item.isGlutenFree && <span className="tag gf">Gluten-Free</span>}
        </div>
        <button className="add-cart-btn" onClick={() => onAddToCart(item)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}