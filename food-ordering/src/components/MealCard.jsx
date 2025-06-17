import React from 'react';
import './MealCard.css';

function MealCard({ meal, onAddToCart }) {
  return (
    <div className="meal-card">
      <img
        className="meal-card__image"
        src={`http://localhost:3000/${meal.image}`}
        alt={meal.name}
      />
      <div className="meal-card__content">
        <h3 className="meal-card__name">{meal.name}</h3>
        <p className="meal-card__desc">{meal.description}</p>
        <div className="meal-card__footer">
          <span className="meal-card__price">${meal.price}</span>
          <button className="meal-card__add" onClick={() => onAddToCart(meal)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MealCard; 