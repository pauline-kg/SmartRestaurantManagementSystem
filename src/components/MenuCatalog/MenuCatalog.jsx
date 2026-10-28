import React, { useState } from 'react';
import FoodCard from './FoodCard';
import './MenuCatalog.css';

// TODO: make sure filter states reset when switching categories if needed
function MenuCatalog({ menuItems, onAddToCart }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filterVegetarian, setFilterVegetarian] = useState(false);
  const [filterGlutenFree, setFilterGlutenFree] = useState(false);

  // filter logic for search bar and category tabs
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    const matchesVeg = !filterVegetarian || item.isVegetarian;
    const matchesGF = !filterGlutenFree || item.isGlutenFree;

    return matchesSearch && matchesCategory && matchesVeg && matchesGF;
  });

  // console.log("Currently filtered items count:", filteredItems.length);

  return (
    <div className="menu-container">
      <div className="filter-panel">
        <input 
          type="text" 
          placeholder="Search menu items..." 
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* category buttons */}
        <div className="category-tabs">
          {['all', 'starters', 'mains', 'desserts', 'beverages'].map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="dietary-checkboxes">
          <label>
            <input 
              type="checkbox" 
              checked={filterVegetarian} 
              onChange={(e) => setFilterVegetarian(e.target.checked)} 
            /> 🌱 Vegetarian
          </label>
          <label>
            <input 
              type="checkbox" 
              checked={filterGlutenFree} 
              onChange={(e) => setFilterGlutenFree(e.target.checked)} 
            /> 🌾 Gluten-Free
          </label>
        </div>
      </div>

      <div className="food-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))
        ) : (
          <p className="no-items">No items match your selected criteria.</p>
        )}
      </div>
    </div>
  );
}

export default MenuCatalog;
