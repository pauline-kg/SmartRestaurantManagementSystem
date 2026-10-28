import React from 'react';

// TODO: check if image scaling looks weird on mobile screen sizes
function FoodCard({ item, onAddToCart }) {
  
  const handleAddClick = () => {
    console.log("Adding food item to cart:", item.name); // testing click handler
    onAddToCart(item);
  };

  return (
    <div className="food-card">
      <img src={item.image} alt={item.name} className="food-card-img" />
      
      <div className="food-card-body">
        <div className="food-card-header">
          <h3>{item.name}</h3>
          <span className="food-price">${item.price.toFixed(2)}</span>
        </div>

        <p className="food-desc">{item.description}</p>
        
        <p className="food-ingredients">
          <strong>Ingredients:</strong> {item.ingredients}
        </p>

        {/* dietary badges */}
        <div className="food-tags">
          {item.isVegetarian && <span className="tag veg">Vegetarian</span>}
          {item.isGlutenFree && <span className="tag gf">Gluten-Free</span>}
        </div>

        <button className="add-cart-btn" onClick={handleAddClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default FoodCard;
